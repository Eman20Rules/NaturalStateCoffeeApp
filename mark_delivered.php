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

    public function isDeliveryMarkValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];


            $user_subscription_ids = isset($this->userData['user_subscription_ids']) ? $this->userData['user_subscription_ids'] : array();

        
            $orders = $this->insertCoffee($userId, $user_subscription_ids);
            if ($orders) {
                return [
                    "success" => 1,
                    "orders" => "Coffee Edited",
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Coffee could not be edited",
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

    protected function insertCoffee($user_id, $user_subscription_ids)
    {
        try {


            $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('i', $user_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
            

            if ($subscription_data['is_admin'] == 1) {

                // Update the delivered status for each subscription ID in the array
            foreach ($user_subscription_ids as $subscription_id) {
                $update_sql = "UPDATE `users_coffee_subscription` SET `delivered` = 1 WHERE `user_coffee_subscription_id` = ?";
                $update_stmt = $this->db->prepare($update_sql);
                $update_stmt->bind_param('i', $subscription_id);
                $update_stmt->execute();
                $update_stmt->close();
        }
                return true;
    
                
            } else {
                // Code to execute if user is not an admin
            }
           
        } catch (Exception $e) {
            return null;
        }
    }
}
