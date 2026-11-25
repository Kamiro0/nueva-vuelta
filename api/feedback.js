import { neon } from '@neondatabase/serverless'

const VALID_ITEMS = new Set([
  'podcast-01',
  'podcast-02',
  'podcast-03',
  'historia-1',
  'historia-2',
  'historia-3',
  'video-principal',
])
const VALID_REACTIONS = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function respond(res, status, data) {
  return res.status(status).json(data)
}

function requireVisitor(value) {
  if (typeof value !== 'string' || !UUID_PATTERN.test(value)) {
    throw new ApiError(422, 'No se pudo identificar tu sesión para registrar la reacción.')
  }
  return value.toLowerCase()
}

function requireItem(value) {
  if (typeof value !== 'string' || !VALID_ITEMS.has(value)) {
    throw new ApiError(404, 'El contenido solicitado no existe.')
  }
  return value
}

function requireText(value, field, maxLength) {
  if (typeof value !== 'string') {
    throw new ApiError(422, `El campo ${field} es obligatorio.`)
  }

  const text = value.trim()
  if (!text || text.length > maxLength) {
    throw new ApiError(422, `El campo ${field} está vacío o supera el límite permitido.`)
  }
  return text
}

function getRequestBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      throw new ApiError(400, 'La solicitud no tiene un formato válido.')
    }
  }
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    return req.body
  }
  throw new ApiError(400, 'La solicitud no tiene un formato válido.')
}

async function getReactionSummary(sql, item, visitor) {
  const [counts, visitorRows] = await Promise.all([
    sql`SELECT reaction_type, COUNT(*)::int AS total
         FROM reactions WHERE content_id = ${item} GROUP BY reaction_type`,
    sql`SELECT reaction_type FROM reactions
         WHERE content_id = ${item} AND visitor_id = ${visitor}::uuid`,
  ])
  const reactionCounts = Object.fromEntries(VALID_REACTIONS.map((type) => [type, 0]))

  for (const row of counts) {
    if (Object.hasOwn(reactionCounts, row.reaction_type)) {
      reactionCounts[row.reaction_type] = Number(row.total)
    }
  }

  return {
    reactions: Object.values(reactionCounts).reduce((total, count) => total + count, 0),
    reactionCounts,
    myReaction: visitorRows[0]?.reaction_type || null,
  }
}

async function getFeedback(sql, item, visitor) {
  const [comments, reactionSummary, shareRows] = await Promise.all([
    sql`SELECT id, name, comment_text AS comment, created_at
         FROM comments WHERE content_id = ${item} ORDER BY created_at ASC, id ASC`,
    getReactionSummary(sql, item, visitor),
    sql`SELECT COUNT(*)::int AS total FROM shares WHERE content_id = ${item}`,
  ])

  return {
    comments,
    ...reactionSummary,
    shares: Number(shareRows[0].total),
  }
}

async function handleGet(req, res, sql) {
  const query = req.query || {}
  const item = requireItem(query.item)
  const visitor = requireVisitor(query.visitor)
  return respond(res, 200, await getFeedback(sql, item, visitor))
}

async function handlePost(req, res, sql) {
  const payload = getRequestBody(req)
  const item = requireItem(payload.item)
  const visitor = requireVisitor(payload.visitor)

  if (payload.action === 'comment') {
    const name = requireText(payload.name, 'nombre', 60)
    const comment = requireText(payload.comment, 'comentario', 1000)
    const rows = await sql`INSERT INTO comments (content_id, visitor_id, name, comment_text)
                           VALUES (${item}, ${visitor}::uuid, ${name}, ${comment})
                           RETURNING id, name, comment_text AS comment, created_at`
    return respond(res, 201, { comment: rows[0] })
  }

  if (payload.action === 'react') {
    if (typeof payload.reaction !== 'string' || !VALID_REACTIONS.includes(payload.reaction)) {
      throw new ApiError(422, 'La reacción seleccionada no es válida.')
    }

    const existing = await sql`SELECT reaction_type FROM reactions
                               WHERE content_id = ${item} AND visitor_id = ${visitor}::uuid`
    if (existing[0]?.reaction_type === payload.reaction) {
      await sql`DELETE FROM reactions
                WHERE content_id = ${item} AND visitor_id = ${visitor}::uuid
                  AND reaction_type = ${payload.reaction}`
    } else {
      await sql`INSERT INTO reactions (content_id, visitor_id, reaction_type)
                VALUES (${item}, ${visitor}::uuid, ${payload.reaction})
                ON CONFLICT (content_id, visitor_id)
                DO UPDATE SET reaction_type = EXCLUDED.reaction_type`
    }

    return respond(res, 200, await getReactionSummary(sql, item, visitor))
  }

  if (payload.action === 'share') {
    await sql`INSERT INTO shares (content_id, visitor_id) VALUES (${item}, ${visitor}::uuid)`
    const rows = await sql`SELECT COUNT(*)::int AS total FROM shares WHERE content_id = ${item}`
    return respond(res, 200, { shares: Number(rows[0].total) })
  }

  throw new ApiError(422, 'La acción solicitada no es válida.')
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return respond(res, 405, { error: 'Método no permitido.' })
  }

  try {
    if (!process.env.DATABASE_URL) {
      throw new ApiError(503, 'Falta configurar DATABASE_URL en Vercel para conectar la base de datos.')
    }

    const sql = neon(process.env.DATABASE_URL)
    if (req.method === 'GET') return await handleGet(req, res, sql)
    return await handlePost(req, res, sql)
  } catch (error) {
    if (error instanceof ApiError) return respond(res, error.status, { error: error.message })

    console.error('La Nueva Vuelta API:', error)
    return respond(res, 500, {
      error: 'No se pudo acceder a PostgreSQL. Revisa DATABASE_URL y ejecuta database/vercel_postgres.sql.',
    })
  }
}
