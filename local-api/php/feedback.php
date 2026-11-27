<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/', $origin)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$validItems = [
    'podcast-01',
    'podcast-02',
    'podcast-03',
    'historia-1',
    'historia-2',
    'historia-3',
    'video-principal',
];
$validReactions = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requireText($value, string $field, int $maxBytes): string
{
    if (!is_string($value)) {
        respond(['error' => "El campo {$field} es obligatorio."], 422);
    }

    $value = trim($value);
    if ($value === '' || strlen($value) > $maxBytes) {
        respond(['error' => "El campo {$field} está vacío o supera el límite permitido."], 422);
    }

    return $value;
}

function requireVisitor($value): string
{
    if (!is_string($value) || !preg_match('/^[a-f0-9-]{36}$/i', $value)) {
        respond(['error' => 'No se pudo identificar tu sesión para registrar la reacción.'], 422);
    }

    return strtolower($value);
}

function getReactionSummary(PDO $database, string $item, string $visitor, array $validReactions): array
{
    $reactionCounts = array_fill_keys($validReactions, 0);
    $countsQuery = $database->prepare(
        'SELECT reaction_type, COUNT(*) AS total
         FROM reactions WHERE content_id = :content_id GROUP BY reaction_type'
    );
    $countsQuery->execute(['content_id' => $item]);
    foreach ($countsQuery->fetchAll() as $row) {
        if (array_key_exists($row['reaction_type'], $reactionCounts)) {
            $reactionCounts[$row['reaction_type']] = (int) $row['total'];
        }
    }

    $visitorQuery = $database->prepare(
        'SELECT reaction_type FROM reactions
         WHERE content_id = :content_id AND visitor_id = :visitor_id'
    );
    $visitorQuery->execute(['content_id' => $item, 'visitor_id' => $visitor]);

    return [
        'reactions' => array_sum($reactionCounts),
        'reactionCounts' => $reactionCounts,
        'myReaction' => $visitorQuery->fetchColumn() ?: null,
    ];
}

try {
    $database = getDatabaseConnection();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $item = $_GET['item'] ?? '';
        $visitor = requireVisitor($_GET['visitor'] ?? '');
        if (!in_array($item, $validItems, true)) {
            respond(['error' => 'El contenido solicitado no existe.'], 404);
        }

        $commentsQuery = $database->prepare(
            'SELECT id, name, comment_text AS comment, created_at
             FROM comments WHERE content_id = :content_id ORDER BY created_at ASC, id ASC'
        );
        $commentsQuery->execute(['content_id' => $item]);

        $reactionSummary = getReactionSummary($database, $item, $visitor, $validReactions);
        $sharesQuery = $database->prepare('SELECT COUNT(*) FROM shares WHERE content_id = :content_id');
        $sharesQuery->execute(['content_id' => $item]);

        respond([
            'comments' => $commentsQuery->fetchAll(),
            'reactions' => $reactionSummary['reactions'],
            'reactionCounts' => $reactionSummary['reactionCounts'],
            'myReaction' => $reactionSummary['myReaction'],
            'shares' => (int) $sharesQuery->fetchColumn(),
        ]);
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST, OPTIONS');
        respond(['error' => 'Método no permitido.'], 405);
    }

    $payload = json_decode(file_get_contents('php://input'), true);
    if (!is_array($payload)) {
        respond(['error' => 'La solicitud no tiene un formato válido.'], 400);
    }

    $item = $payload['item'] ?? '';
    if (!is_string($item) || !in_array($item, $validItems, true)) {
        respond(['error' => 'El contenido solicitado no existe.'], 404);
    }
    $visitor = requireVisitor($payload['visitor'] ?? '');
    $action = $payload['action'] ?? '';

    if ($action === 'comment') {
        $name = requireText($payload['name'] ?? null, 'nombre', 240);
        $comment = requireText($payload['comment'] ?? null, 'comentario', 4000);
        $insert = $database->prepare(
            'INSERT INTO comments (content_id, visitor_id, name, comment_text)
             VALUES (:content_id, :visitor_id, :name, :comment_text)'
        );
        $insert->execute([
            'content_id' => $item,
            'visitor_id' => $visitor,
            'name' => $name,
            'comment_text' => $comment,
        ]);

        $select = $database->prepare(
            'SELECT id, name, comment_text AS comment, created_at
             FROM comments WHERE id = :id'
        );
        $select->execute(['id' => $database->lastInsertId()]);
        respond(['comment' => $select->fetch()], 201);
    }

    if ($action === 'react') {
        $reaction = $payload['reaction'] ?? '';
        if (!is_string($reaction) || !in_array($reaction, $validReactions, true)) {
            respond(['error' => 'La reacción seleccionada no es válida.'], 422);
        }

        $database->beginTransaction();
        $existing = $database->prepare(
            'SELECT reaction_type FROM reactions
             WHERE content_id = :content_id AND visitor_id = :visitor_id FOR UPDATE'
        );
        $existing->execute(['content_id' => $item, 'visitor_id' => $visitor]);
        $existingReaction = $existing->fetchColumn();

        if ($existingReaction === $reaction) {
            $delete = $database->prepare(
                'DELETE FROM reactions WHERE content_id = :content_id AND visitor_id = :visitor_id'
            );
            $delete->execute(['content_id' => $item, 'visitor_id' => $visitor]);
        } elseif ($existingReaction !== false) {
            $update = $database->prepare(
                'UPDATE reactions SET reaction_type = :reaction_type
                 WHERE content_id = :content_id AND visitor_id = :visitor_id'
            );
            $update->execute([
                'reaction_type' => $reaction,
                'content_id' => $item,
                'visitor_id' => $visitor,
            ]);
        } else {
            $insert = $database->prepare(
                'INSERT INTO reactions (content_id, visitor_id, reaction_type)
                 VALUES (:content_id, :visitor_id, :reaction_type)'
            );
            $insert->execute([
                'content_id' => $item,
                'visitor_id' => $visitor,
                'reaction_type' => $reaction,
            ]);
        }

        $database->commit();
        respond(getReactionSummary($database, $item, $visitor, $validReactions));
    }

    if ($action === 'share') {
        $insert = $database->prepare(
            'INSERT INTO shares (content_id, visitor_id) VALUES (:content_id, :visitor_id)'
        );
        $insert->execute(['content_id' => $item, 'visitor_id' => $visitor]);

        $count = $database->prepare('SELECT COUNT(*) FROM shares WHERE content_id = :content_id');
        $count->execute(['content_id' => $item]);
        respond(['shares' => (int) $count->fetchColumn()]);
    }

    respond(['error' => 'La acción solicitada no es válida.'], 422);
} catch (Throwable $error) {
    if (isset($database) && $database instanceof PDO && $database->inTransaction()) {
        $database->rollBack();
    }
    error_log('La Nueva Vuelta API: ' . $error->getMessage());
    respond(['error' => 'No fue posible acceder a la base de datos. Verifica que MySQL esté iniciado y configurado.'], 500);
}
