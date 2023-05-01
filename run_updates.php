<?php

// Set content type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



require __DIR__ . '/database.php';




$db = new Database();
$db->dbConnection();

    require __DIR__ . '/update_orders.php';
    $auth = new Auth($db);
    $response = $auth->updateOrders();
    echo json_encode($response);
 
// Close database connection
$db->close();
?>