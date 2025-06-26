<?php
require 'conexion.php'; // Este archivo debe definir $pdo como instancia de PDO

// Obtener y sanitizar datos del formulario
$first_name = trim($_POST['first_name']);
$last_name = trim($_POST['last_name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$artist_id = intval($_POST['artist_id']);
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];
$tattoo_description = trim($_POST['tattoo_description']);

// Campos ocultos con valores por defecto
$status = $_POST['status'] ?? 'pending';
$duration_hours = floatval($_POST['duration_hours'] ?? 2.0);
$deposit_amount = floatval($_POST['deposit_amount'] ?? 50.00);
$deposit_paid = intval($_POST['deposit_paid'] ?? 0);

try {
    // Paso 1: Verificar si el cliente ya existe
    $stmt = $pdo->prepare("SELECT id FROM clients WHERE email = ?");
    $stmt->execute([$email]);
    $client = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($client) {
        $client_id = $client['id'];
    } else {
        // Crear nuevo cliente
        $insert_client = $pdo->prepare("INSERT INTO clients (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)");
        $insert_client->execute([$first_name, $last_name, $email, $phone]);
        $client_id = $pdo->lastInsertId();
    }

    // Paso 2: Insertar la cita
    $insert_appointment = $pdo->prepare("INSERT INTO appointments 
        (client_id, artist_id, appointment_date, appointment_time, duration_hours, status, tattoo_description, deposit_amount, deposit_paid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $insert_appointment->execute([
        $client_id,
        $artist_id,
        $appointment_date,
        $appointment_time,
        $duration_hours,
        $status,
        $tattoo_description,
        $deposit_amount,
        $deposit_paid
    ]);

    echo "✅ Cita registrada exitosamente.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Error en la base de datos: " . $e->getMessage();
}
?>
