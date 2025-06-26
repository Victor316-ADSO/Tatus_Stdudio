<?php
require './php/conexion.php'; // Tu conexión

$data = json_decode(file_get_contents("php://input"), true);

$first_name = $data['first_name'];
$last_name = $data['last_name'];
$email = $data['email'];
$phone = $data['phone'];

try {
    // Verifica si ya existe
    $stmt = $pdo->prepare("SELECT id FROM clients WHERE email = ?");
    $stmt->execute([$email]);
    $existingClient = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingClient) {
        echo json_encode(['success' => true, 'client_id' => $existingClient['id']]);
    } else {
        // Insertar nuevo cliente
        $stmt = $pdo->prepare("INSERT INTO clients (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)");
        $stmt->execute([$first_name, $last_name, $email, $phone]);

        echo json_encode(['success' => true, 'client_id' => $pdo->lastInsertId()]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
