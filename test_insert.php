<?php
     $HOST='us-east.connect.psdb.cloud';
     $USERNAME='4xfep5llxmbrrbyvju7q';
     $PASSWORD='pscale_pw_H6XH2ASXTk407mtSsnkx1fJGpklNEmRq0Wxmf18I4AW';
     $DATABASE='nsdevdb';
 
     $mysqli = mysqli_init();
     $mysqli->ssl_set(NULL, NULL, "/etc/ssl/certs/ca-certificates.crt", NULL, NULL);
     $mysqli->real_connect($_ENV["HOST"], $_ENV["USERNAME"], $_ENV["PASSWORD"], $_ENV["DATABASE"]);
     $mysqli->close();
 
     if ($mysqli->connect_error) {
        echo 'not connected to the database';
    } else {
        echo "Connected successfully";
    }

    $PersonID=$_POST['PersonID'];
    $Name=$_POST['Name'];
    

    $IQ="insert into test(PersonID,Name) values($PersonID, '$Name')";

    $R=mysqli_query($CN,$IQ);

    if($R)
    {
        $Message="Registered successfully";
    }
    else
    {
        $Message="Server Error";
    }

    echo($Message);

?>


