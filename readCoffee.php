<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require __DIR__.'/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();


$mysqli = mysqli_init();
$mysqli->ssl_set(
    NULL,
    NULL,
    "/etc/ssl/certs/ca-certificates.crt",
    NULL,
    NULL
);

$db_host = getenv('HOST');
$db_user = getenv('USERNAME');
$db_pass = getenv('PASSWORD');
$db_name = getenv('DATABASE');

$mysqli->real_connect($db_host, $db_user, $db_pass, $db_name, NULL,
MYSQLI_CLIENT_SSL,
MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT);


// Check for errors
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

// Define the query to retrieve data
$query = "SELECT * FROM Tcoffee";

// Execute the query
$result = $mysqli->query($query);

// Check for errors
if (!$result) {
    die('Query Error (' . $mysqli->errno . ') '
            . $mysqli->error);
}

// Fetch the data and store it in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Send the data as a JSON response
header('Content-Type: application/json');
echo json_encode($data);

// Close database connection
$mysqli->close();
?>