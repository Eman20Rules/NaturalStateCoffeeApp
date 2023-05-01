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

$subscription_id= $DecodedData['subscription_id'] ?? '';
$user_id= $DecodedData['user_id'] ?? '';
$renewal_date= $DecodedData['renewal_date'] ?? '';
$amount= $DecodedData['amount'] ?? '';
$coffee_id= $DecodedData['coffee_id'] ?? '';


if ($subscription_id == '' || $user_id == '' || $renewal_date == '' || $amount == '' || $coffee_id == '') {
    $Message = 'Required field(s) missing';
} else {
    // Prepare the query with placeholders for the variables
$IQ = "INSERT INTO users_coffee_subscription (subscription_id, user_id, renewal_date, amount, coffee_id, order_date) VALUES (?, ?, ?, ?, ?, NOW())";

// Prepare the statement
$stmt = $mysqli->prepare($IQ);

// Bind the variables to the prepared statement as parameters
$stmt->bind_param('sssss', $subscription_id, $user_id, $renewal_date, $amount, $coffee_id);

// Execute the statement
if ($stmt->execute()) {
    $Message = 'Order Created';
} else {
    $Message = 'Error creating';
}
}

$Response = array('Message' => $Message);
    echo json_encode($Response);

// Close database connection
$mysqli->close();
?>