<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require __DIR__.'/vendor/autoload.php';

class ReadCoffee {
    function read_coffee(Database $db) {
        // Define the query to retrieve data
        $query = "SELECT * FROM Tcoffee";

        // Execute the query using the query() method from the Database class
        $result = $db->query($query);

        // Check for errors
        if (!$result) {
            die('Query Error (' . $db->errno . ') '
                . $db->error);
        }

        // Fetch the data and store it in an array
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Close the result set
        $result->close();

        // Return the data array
        return $data;
    }
}

