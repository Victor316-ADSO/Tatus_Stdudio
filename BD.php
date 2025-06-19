<?php
// Configura tu conexión
$host = 'localhost';
$db   = 'ink_dreams_studio';
$user = 'root'; // ← reemplaza con tu usuario
$pass = ''; // ← reemplaza con tu contraseña
$charset = 'utf8mb4';

// Conexión PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Obtener todas las tablas de la base de datos
    $stmt = $pdo->prepare("
        SELECT TABLE_NAME
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = :db
        ORDER BY TABLE_NAME
    ");
    $stmt->execute(['db' => $db]);
    $tables = $stmt->fetchAll();

} catch (PDOException $e) {
    die("Error al conectar con la base de datos: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Estructura de la Base de Datos</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f2f2f2; margin: 20px; }
        h1, h2 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background: white; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #555; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        code { color: darkblue; }
    </style>
</head>
<body>
    <h1>Estructura de la Base de Datos: <code><?= htmlspecialchars($db) ?></code></h1>

    <?php foreach ($tables as $table): 
        $tableName = $table['TABLE_NAME'];

        // Obtener columnas de la tabla
        $columnsStmt = $pdo->prepare("
            SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = :db AND TABLE_NAME = :table
            ORDER BY ORDINAL_POSITION
        ");
        $columnsStmt->execute(['db' => $db, 'table' => $tableName]);
        $columns = $columnsStmt->fetchAll();
    ?>
        <h2>Tabla: <code><?= htmlspecialchars($tableName) ?></code></h2>
        <table>
            <thead>
                <tr>
                    <th>Columna</th>
                    <th>Tipo</th>
                    <th>Nulo</th>
                    <th>Clave</th>
                    <th>Por defecto</th>
                    <th>Extra</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($columns as $col): ?>
                    <tr>
                        <td><?= htmlspecialchars($col['COLUMN_NAME']) ?></td>
                        <td><?= htmlspecialchars($col['COLUMN_TYPE']) ?></td>
                        <td><?= htmlspecialchars($col['IS_NULLABLE']) ?></td>
                        <td><?= htmlspecialchars($col['COLUMN_KEY']) ?></td>
                        <td><?= htmlspecialchars($col['COLUMN_DEFAULT']) ?></td>
                        <td><?= htmlspecialchars($col['EXTRA']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endforeach; ?>
</body>
</html>
