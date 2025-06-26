<?php
require 'conexion.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

try {
    $artist_id = $_GET['artist_id'] ?? null;

    $sql = "SELECT 
                a.id, a.appointment_date, a.status, a.duration_hours, a.tattoo_description, 
                ar.name AS artist_name
            FROM appointments a
            JOIN artists ar ON a.artist_id = ar.id
            WHERE a.status = 'pending'";

    $params = [];

    if ($artist_id) {
        $sql .= " AND a.artist_id = ?";
        $params[] = $artist_id;
    }

    $sql .= " ORDER BY a.appointment_date ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $totalWaiting = count($data);
    $avgWaitTime = 0;
    $nextAvailable = null;

    if ($totalWaiting > 0) {
        $sumDays = 0;
        $today = new DateTime();

        foreach ($data as &$row) {
            $apptDate = new DateTime($row['appointment_date']);
            $row['estimated_date'] = $apptDate->format('Y-m-d');
            $diff = $today->diff($apptDate)->days;
            $sumDays += $diff;
        }

        $avgWaitTime = round($sumDays / $totalWaiting);
        $nextAvailable = $data[0]['appointment_date'];
    }

    echo json_encode([
        'stats' => [
            'totalWaiting' => $totalWaiting,
            'avgWaitTime' => $avgWaitTime,
            'nextAvailable' => $nextAvailable,
        ],
        'appointments' => $data
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al obtener la lista de espera',
        'message' => $e->getMessage()
    ]);
}
?>
