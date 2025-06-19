<?php

header('Content-Type: application/json');

// Conexión a la base de datos (ajusta los valores según tu configuración)
$host = "localhost";
$user = "root";
$password = "";
$dbname = "ink_dreams_studio";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT id, name, specialty, bio, experience_years, hourly_rate, instagram, portfolio_url, profile_image 
        FROM artists 
        WHERE is_active = 1";

$result = $conn->query($sql);
$artists = [];

while ($row = $result->fetch_assoc()) {
    $artists[] = $row;
}

echo json_encode($artists);
$conn->close();
?>
