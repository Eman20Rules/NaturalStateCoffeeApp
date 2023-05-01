<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$mysqli = mysqli_init();
$mysqli->ssl_set(
    NULL,
    NULL,
    "/etc/ssl/certs/ca-certificates.crt",
    NULL,
    NULL
);

$mysqli->real_connect(
    "us-east.connect.psdb.cloud",
    "4xfep5llxmbrrbyvju7q",
    "pscale_pw_H6XH2ASXTk407mtSsnkx1fJGpklNEmRq0Wxmf18I4AW",
    "nsdevdb",
    NULL,
    MYSQLI_CLIENT_SSL,
    MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT
);

if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
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
