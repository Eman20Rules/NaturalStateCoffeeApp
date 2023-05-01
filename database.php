<?php
class Database{
    private $mysqli;
    public function dbConnection(){
        try{
            $this->mysqli = mysqli_init();
            $this->mysqli->ssl_set(
                NULL,
                NULL,
                "/etc/ssl/certs/ca-certificates.crt",
                NULL,
                NULL
            );
            $this->mysqli->real_connect(
                "us-east.connect.psdb.cloud",
                "rr7ozthrvjxcpfj43d5t",
                "pscale_pw_qzLbnoTcoTI1yWahmtM7oJTUJv4NoSeOFp07e3JCOTh",
                "nsdevdb",
                NULL,
                MYSQLI_CLIENT_SSL,
                MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT
            );
            
            return $this->mysqli; // add this line
        }
        catch (Exception $e) {
            // Handle the exception here
        }    
              
        }
        public function query($sql) {
            return $this->mysqli->query($sql);
        }
        public function close(){
            if ($this->mysqli) {
                $this->mysqli->close();
            }
        }

        public function prepare($sql) {
            return $this->mysqli->prepare($sql);
        }
    }
