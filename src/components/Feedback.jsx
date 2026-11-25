import { useEffect, useState } from 'react'
import { MessageCircle, Share2, ThumbsUp, X } from 'lucide-react'

const PHP_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = PHP_API_BASE_URL
  ? `${PHP_API_BASE_URL.replace(/\/+$/, '')}/feedback.php`
  : '/api/feedback'
const VISITOR_KEY = 'la-nueva-vuelta-visitor'
const REACTION_OPTIONS = [
  { type: 'like', emoji: '👍', label: 'Me gusta' },
  { type: 'love', emoji: '❤️', label: 'Me encanta' },
  { type: 'care', emoji: '🤗', label: 'Me importa' },
  { type: 'haha', emoji: '😆', label: 'Me divierte' },
  { type: 'wow', emoji: '😮', label: 'Me asombra' },
  { type: 'sad', emoji: '😢', label: 'Me entristece' },
  { type: 'angry', emoji: '😡', label: 'Me enoja' },
]

function createEmptyReactionCounts() {
  return Object.fromEntries(REACTION_OPTIONS.map(({ type }) => [type, 0]))
}

function getVisitorId() {
  let visitorId = window.localStorage.getItem(VISITOR_KEY)
  if (!visitorId) {
    visitorId = window.crypto.randomUUID()
    window.localStorage.setItem(VISITOR_KEY, visitorId)
  }
  return visitorId
}

async function readApiResponse(response, fallbackError) {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('La API no respondió en formato JSON. En Vercel, comprueba que /api/feedback esté desplegada; en XAMPP, revisa Apache y la ruta de la API.')
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('El servidor envió una respuesta JSON no válida. Comprueba la configuración de la API.')
  }
  if (!response.ok) throw new Error(data.error || fallbackError)
  return data
}

function Feedback({ contentId, title, mode = 'modal' }) {
  const [feedback, setFeedback] = useState({
    comments: [],
    reactions: 0,
    reactionCounts: createEmptyReactionCounts(),
    myReaction: null,
    shares: 0,
  })
  const [isOpen, setIsOpen] = useState(mode === 'inline')
  const [isReactionPickerOpen, setIsReactionPickerOpen] = useState(false)
  const [reactionAnimation, setReactionAnimation] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadFeedback() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}?item=${encodeURIComponent(contentId)}&visitor=${encodeURIComponent(getVisitorId())}`)
      const data = await readApiResponse(response, 'No se pudo cargar la conversación.')
      setFeedback(data)
    } catch (requestError) {
      setError(requestError.message || 'No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback()
  }, [contentId])

  async function submit(action, values = {}) {
    setSaving(true)
    setError('')
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, item: contentId, visitor: getVisitorId(), ...values }),
      })
      const data = await readApiResponse(response, 'No se pudo guardar. Inténtalo de nuevo.')
      if (action === 'comment') {
        setFeedback((current) => ({ ...current, comments: [...current.comments, data.comment] }))
        setComment('')
      } else if (action === 'react') {
        setFeedback((current) => ({
          ...current,
          reactions: data.reactions,
          reactionCounts: data.reactionCounts,
          myReaction: data.myReaction,
        }))
      } else if (action === 'share') {
        setFeedback((current) => ({ ...current, shares: data.shares }))
      }
    } catch (requestError) {
      setError(requestError.message || 'No se pudo conectar con el servidor.')
    } finally {
      setSaving(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    submit('comment', { name, comment })
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href })
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      } else {
        throw new Error('Este navegador no permite compartir desde esta página.')
      }

      await submit('share')
    } catch (requestError) {
      if (requestError.name === 'AbortError') return
      setError(requestError.message || 'No se pudo compartir el enlace.')
    }
  }

  const conversation = (
    <>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Tu nombre
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={60}
            required
            placeholder="¿Cómo te llamas?"
          />
        </label>
        <label>
          Comentario
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={1000}
            required
            placeholder="Comparte lo que piensas..."
            rows={3}
          />
        </label>
        <button className="feedback-submit" type="submit" disabled={saving}>
          {saving ? 'ENVIANDO...' : 'PUBLICAR COMENTARIO'}
        </button>
      </form>

      <div className="feedback-comments" aria-live="polite">
        {loading ? <p className="feedback-empty">Cargando comentarios...</p> : null}
        {!loading && feedback.comments.length === 0 && (
          <p className="feedback-empty">Sé la primera persona en comentar.</p>
        )}
        {feedback.comments.map((entry) => (
          <article className="feedback-comment" key={entry.id}>
            <strong>{entry.name}</strong>
            <time dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleString('es-CO')}</time>
            <p>{entry.comment}</p>
          </article>
        ))}
      </div>
    </>
  )
  const selectedReaction = REACTION_OPTIONS.find(({ type }) => type === feedback.myReaction)

  return (
    <section className={`feedback feedback-mode-${mode}`} aria-label={`Interacciones de ${title}`}>
      <div
        className="feedback-actions"
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsReactionPickerOpen(false)
        }}
      >
        <div
          className="feedback-reaction-picker"
          id={`${contentId}-reaction-picker`}
          hidden={!isReactionPickerOpen}
          role="group"
          aria-label="Elige una reacción"
        >
          {REACTION_OPTIONS.map((reaction) => (
            <button
              className={`feedback-reaction${feedback.myReaction === reaction.type ? ' is-reacted' : ''}`}
              type="button"
              key={reaction.type}
              onClick={() => {
                setIsReactionPickerOpen(false)
                setReactionAnimation((current) => current + 1)
                submit('react', { reaction: reaction.type })
              }}
              disabled={saving || loading}
              aria-label={reaction.label}
              aria-pressed={feedback.myReaction === reaction.type}
              title={reaction.label}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
        <div className="feedback-metrics">
          <button
            key={reactionAnimation}
            className={`feedback-react-trigger${reactionAnimation ? ' is-animating' : ''}${isReactionPickerOpen ? ' is-picker-open' : ''}`}
            type="button"
            onClick={() => setIsReactionPickerOpen((isOpen) => !isOpen)}
            disabled={saving || loading}
            aria-label={selectedReaction ? `Cambiar reacción: ${selectedReaction.label}` : 'Reaccionar'}
            aria-expanded={isReactionPickerOpen}
            aria-controls={`${contentId}-reaction-picker`}
          >
            {selectedReaction ? selectedReaction.emoji : <ThumbsUp size={17} aria-hidden="true" />}
          </button>
          <span className="feedback-reaction-total" aria-label={`${feedback.reactions} reacciones`}>
            <ThumbsUp size={16} aria-hidden="true" />
            <span>{feedback.reactions}</span>
          </span>
          <button
            className="feedback-open"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Ver ${feedback.comments.length} comentarios`}
          >
            <MessageCircle size={17} />
            <span>{feedback.comments.length}</span>
          </button>
          <button
            className="feedback-share"
            type="button"
            onClick={handleShare}
            disabled={saving || loading}
            aria-label={`Compartir, ${feedback.shares} veces`}
          >
            <Share2 size={17} />
            <span>{feedback.shares}</span>
          </button>
        </div>
      </div>
      {error && <p className="feedback-error" role="alert">{error}</p>}

      {mode === 'inline' && (
        <div className="feedback-inline-content">
          <h2>Comentarios</h2>
          {conversation}
        </div>
      )}

      {mode === 'modal' && isOpen && (
        <div className="feedback-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}>
          <section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby={`${contentId}-feedback-title`}>
            <header className="feedback-modal-header">
              <div>
                <span className="section-kicker">LA NUEVA VUELTA / CONVERSACIÓN</span>
                <h2 id={`${contentId}-feedback-title`}>{title}</h2>
              </div>
              <button className="feedback-close" type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar comentarios">
                <X size={20} />
              </button>
            </header>
            {conversation}
          </section>
        </div>
      )}
    </section>
  )
}

export default Feedback
