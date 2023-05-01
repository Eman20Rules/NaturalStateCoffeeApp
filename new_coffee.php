<?php
require __DIR__ . '/JwtHandler.php';

class Auth extends JwtHandler
{
    protected $db;
    protected $headers;
    protected $token;
    protected $userData;

    public function __construct($db, $headers, $userDataJson)
    {
        parent::__construct();
        $this->db = $db;
        $this->headers = $headers;
        $this->userData = json_decode($userDataJson, true);
    }

    public function isCoffeeInsertValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            $coffee_name = $this->userData['coffee_name'];
            $coffee_flavor = $this->userData['coffee_flavor'];
            $process = $this->userData['process'];
            $coffee_like = $this->userData['coffee_like'];
            $coffee_image = $this->userData['coffee_image'];
            $price = $this->userData['price'];

            if ($orders = $this->insertCoffee($userId, $coffee_name, $coffee_flavor, $process, $coffee_like, $coffee_image, $price)) {
                return [
                    "success" => 1,
                    "orders" => "Coffee Created",
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Coffee could not be created",
                    "status" => 400
                ];
            }
        } else {
            return [
                "success" => 0,
                "message" => "Token not found in request",
                "status" => 400
            ];
        }
    }

    protected function insertCoffee($user_id, $coffee_name, $coffee_flavor, $process, $coffee_like, $coffee_image, $price)
    {
        try {


            $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('i', $user_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
            

            if ($subscription_data['is_admin'] == 1) {
                // Code to execute if user is an admin
                $fetch_user_orders = "INSERT INTO Tcoffee (coffee_name, coffee_flavor, process, coffee_like, coffee_image, price) VALUES (?, ?, ?, ?, ?, ?)";
                $query_stmt = $this->db->prepare($fetch_user_orders);
                $query_stmt->bind_param('sssssd', $coffee_name, $coffee_flavor, $process, $coffee_like, $coffee_image, $price);
                $query_stmt->execute();
                return true;
    
                
            } else {
                // Code to execute if user is not an admin
            }
           
        } catch (Exception $e) {
            return null;
        }
    }
}
