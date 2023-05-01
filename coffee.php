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

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    if (is_null($DecodedData)) {
        $Message="Error: Input data was not in the expected format.";
        $Response[]=array("Message"=>$Message);
        echo json_encode($Response);
        return;
    }

    $Username= $DecodedData['Username'] ?? '';
    $Email= $DecodedData['Email'] ?? '';
    $Password= $DecodedData['Password'] ?? '';
    $Street= $DecodedData['Street'] ?? '';
    $City= $DecodedData['City'] ?? '';
    $State= $DecodedData['State'] ?? '';
    $Zipcode=$DecodedData['Zipcode'] ?? '';

    if ($Username == '' || $Email == '' || $Password == '' || $Street == '' || $City == '' || $State == '' || $Zipcode == '') {
        $Message = 'Required field(s) missing';
    } else {
        $IQ = "INSERT INTO Tusers (Username, Email, Password, Street, City, State, Zipcode) VALUES ('$Username', '$Email',  '$Password', '$Street', '$City', '$State', '$Zipcode')";
        $R = mysqli_query($mysqli, $IQ);

        if ($R) {
            $Message = 'Account created';
        } else {
            $Message = 'Error creating account';
        }
    }

    $Response = array('Message' => $Message);
    echo json_encode($Response);



    $mysqli->close();
?>