<?php
$mysqli = new mysqli("localhost", "root", "", "ink_dreams_studio");

if ($mysqli->connect_error) {
    http_response_code(500);
    die("Error de conexión: " . $mysqli->connect_error);
}

$filter = $_GET['filter'] ?? 'all';

// Base query
$query = "SELECT g.*, a.name AS artist_name
          FROM gallery g
          JOIN artists a ON g.artist_id = a.id
          WHERE g.is_public = 1";

$params = [];
$types = "";

// Agregar filtro si es necesario
if ($filter !== 'all') {
    $query .= " AND LOWER(g.tattoo_style) = LOWER(?)";
    $types .= "s";
    $params[] = $filter;
}

$stmt = $mysqli->prepare($query);

if (!$stmt) {
    http_response_code(500);
    die("Error al preparar la consulta: " . $mysqli->error);
}

// Enlazar parámetros si existen
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$gallery = [];
while ($row = $result->fetch_assoc()) {
    $gallery[] = $row;
}

header('Content-Type: application/json');
echo json_encode($gallery);
?>
