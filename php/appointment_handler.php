<?php
header('Content-Type: application/json');
$host = 'localhost';
$db   = 'ink_dreams_studio';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Error BD: ' . $e->getMessage()]);
    exit;
}

// Cargar artistas
if (isset($_GET['loadArtists'])) {
    $stmt = $pdo->query("SELECT id, name FROM artists WHERE is_active = 1 ORDER BY name");
    echo json_encode($stmt->fetchAll());
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$clientName     = trim($_POST['clientName'] ?? '');
$clientEmail    = trim($_POST['clientEmail'] ?? '');
$clientPhone    = trim($_POST['clientPhone'] ?? '');
$artistId       = intval($_POST['artistSelect'] ?? 0);
$appointmentDate= $_POST['appointmentDate'] ?? '';
$appointmentTime= $_POST['appointmentTime'] ?? '';
$tattooDesc     = trim($_POST['tattooDescription'] ?? '');

if (!$clientName || !$clientEmail || !$clientPhone || !$artistId || !$appointmentDate || !$appointmentTime || !$tattooDesc) {
    echo json_encode(['success' => false, 'error' => 'Faltan datos obligatorios']);
    exit;
}

try {
    // 1. Verificar o crear cliente
    $stmt = $pdo->prepare("SELECT id FROM clients WHERE email = ?");
    $stmt->execute([$clientEmail]);
    $client = $stmt->fetch();

    if ($client) {
        $clientId = $client['id'];
    } else {
        $stmt = $pdo->prepare("INSERT INTO clients (first_name, last_name, email, phone) VALUES (?, '', ?, ?)");
        $stmt->execute([$clientName, $clientEmail, $clientPhone]);
        $clientId = $pdo->lastInsertId();
    }

    // 2. Insertar cita
    $stmt = $pdo->prepare("
        INSERT INTO appointments
        (client_id, artist_id, appointment_date, appointment_time, tattoo_description)
        VALUES (:cid, :aid, :dt, :tm, :desc)
    ");
    $stmt->execute([
        ':cid'  => $clientId,
        ':aid'  => $artistId,
        ':dt'   => $appointmentDate,
        ':tm'   => $appointmentTime,
        ':desc' => $tattooDesc
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Error al guardar cita: ' . $e->getMessage()]);
    exit;
}
