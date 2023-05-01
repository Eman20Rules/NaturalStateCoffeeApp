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



// Get data from request body
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

if (is_null($DecodedData)) {
    $Message="Error: Input data was not in the expected format.";
    $Response[]=array("Message"=>$Message);
    echo json_encode($Response);
    return;
}

$coffee_name= $DecodedData['coffee_name'] ?? '';
$coffee_flavor= $DecodedData['coffee_flavor'] ?? '';
$process= $DecodedData['process'] ?? '';
$coffee_like= $DecodedData['coffee_like'] ?? '';
$coffee_image= $DecodedData['coffee_image'] ?? '';


if ($coffee_name == '' || $coffee_flavor == '' || $process == '' || $coffee_like == '' || $coffee_image == '') {
    $Message = 'Required field(s) missing';
} else {
    $IQ = "INSERT INTO Tcoffee (coffee_name, coffee_flavor, process, coffee_like, coffee_image) VALUES ('$coffee_name', '$coffee_flavor',  '$process', '$coffee_like', '$coffee_image')";
    $R = mysqli_query($mysqli, $IQ);

    if ($R) {
        $Message = 'Coffee Created';
    } else {
        $Message = 'Error creating';
    }
}

$Response = array('Message' => $Message);
    echo json_encode($Response);

// Close database connection
$mysqli->close();
?>