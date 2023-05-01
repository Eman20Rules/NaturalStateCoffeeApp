<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require __DIR__.'/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

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

            $db_host = getenv('HOST');
            $db_user = getenv('USERNAME');
            $db_pass = getenv('PASSWORD');
            $db_name = getenv('DATABASE');

            $this->mysqli->real_connect(
                $db_host,
                $db_user,
                $db_pass,
                $db_name,
                NULL,
                MYSQLI_CLIENT_SSL,
                MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT
            );
            $this->mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, true);

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
            if (!$this->mysqli) {
                throw new Exception("Error: mysqli object not initialized");
            }
            $stmt = $this->mysqli->prepare($sql);
            if (!$stmt) {
                throw new Exception("Error preparing statement: " . $this->mysqli->error);
            }
            return $stmt;
        }
    }
