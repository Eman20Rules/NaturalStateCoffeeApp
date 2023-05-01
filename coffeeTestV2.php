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

    // retrieving JSON input data

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    if (is_null($DecodedData)) {
        $Message="Error: Input data was not in the expected format.";
        $Response[]=array("Message"=>$Message);
        echo json_encode($Response);
        return;
    }

    $SQLStatement = $DecodedData['Query'] ?? '';
    $Password = $DecodedData['Password'] ?? '';


    // running the SQL query
    if ($Password != "j89*fj923f#") {
        $Message = 'Password is incorrect';
    }
    else if ($SQLStatement == '') { // no SQL statement filled in
        $Message = 'Required field(s) missing';
    } 
    else { // a SQLStatement is filled in
        $R = mysqli_query($mysqli, $SQLStatement);
        if ($R && is_bool($R)) {         // if a response is returned but query is an insert statement
            $Message = 'Account created';
        }   
        else if (!$R && is_bool($R)) {  // if no response is returned but query is an insert statement
            $Message = 'Error creating account';
        }   
        else if (!$R) {                                                         // if no response is returned and query isn't an insert statement (ie it is a select statement)
            die('Query Error (' . $mysqli->errno . ') '
            . $mysqli->error);
        }   
        else {                                                                 // if a response is returned and query isn't an insert statement (ie it is a select statement)
            $data = array();
            while ($row = $R->fetch_assoc()) {
                $data[] = $row;
            }
        }
    }



    // Send the data as a JSON response
    if(is_bool($R)) {
        $Response = array('Message' => $Message);
        echo json_encode($Response);
    }
    else {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    $mysqli->close();
?>