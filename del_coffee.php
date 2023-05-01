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

    public function isCoffeeDelValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            $coffee_id = $this->userData['coffee_id'];

            if ($orders = $this->DelCoffee($userId, $coffee_id)) {
                return [
                    "success" => 1,
                    "orders" => "Coffee Deleted",
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Coffee could not be deleted",
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

    protected function DelCoffee($user_id, $coffee_id)
    {
        try {


            $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('i', $user_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
            

            if ($subscription_data['is_admin'] == 1) {
                // Code to execute if user is an admin
                $fetch_user_orders = "DELETE FROM `users_coffee_subscription` WHERE `coffee_id`=?";
                $query_stmt = $this->db->prepare($fetch_user_orders);
                $query_stmt->bind_param('i', $coffee_id);
                $query_stmt->execute();

                $delete_coffee = "DELETE FROM `Tcoffee` WHERE `coffee_id`=?";
                $query_stmt = $this->db->prepare($delete_coffee);
                $query_stmt->bind_param('i', $coffee_id);
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
