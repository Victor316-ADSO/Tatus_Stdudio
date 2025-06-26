<?php
require './php/conexion.php';

$client_id = $_POST['client_id'];
$artist_id = $_POST['artist_id'];
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];
$tattoo_description = $_POST['tattoo_description'];
$status = $_POST['status'];
$duration_hours = $_POST['duration_hours'];
$deposit_amount = $_POST['deposit_amount'];
$deposit_paid = $_POST['deposit_paid'];

try {
    $stmt = $pdo->prepare("
        INSERT INTO appointments 
        (client_id, artist_id, appointment_date, appointment_time, tattoo_description, status, duration_hours, deposit_amount, deposit_paid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $client_id, $artist_id, $appointment_date, $appointment_time, 
        $tattoo_description, $status, $duration_hours, $deposit_amount, $deposit_paid
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
