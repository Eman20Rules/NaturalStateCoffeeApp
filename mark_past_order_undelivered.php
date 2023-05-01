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

    public function isDeliveryUnmarkValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];


            $user_subscription_ids = isset($this->userData['user_subscription_ids']) ? $this->userData['user_subscription_ids'] : array();

        
            $orders = $this->insertCoffee($userId, $user_subscription_ids);
            if ($orders) {
                return [
                    "success" => 1,
                    "orders" => "Past Subscription Edited",
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Past subscription not be edited",
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

            $new_frequency = "one-time";
            $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('i', $user_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
            

            if ($subscription_data['is_admin'] == 1) {

                // Update the delivered status for each subscription ID in the array
            foreach ($user_subscription_ids as $subscription_id) {
                $get_subscription_sql = "SELECT * FROM `past_coffee_subscriptions` WHERE `past_subscription_id`=?";
                $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
                $get_subscription_stmt->bind_param('i', $subscription_id);
                $get_subscription_stmt->execute();
                $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();

                $insert_deleted_subscription_sql = "INSERT INTO `users_coffee_subscription` (`user_id`, `frequency`, `amount`, `coffee_id`, `order_date`) VALUES (?, ?, ?, ?, ?)";
                $insert_deleted_subscription_stmt = $this->db->prepare($insert_deleted_subscription_sql);
                $insert_deleted_subscription_stmt->bind_param('isiis', $subscription_data['user_id'], $new_frequency, $subscription_data['amount'], $subscription_data['coffee_id'], $subscription_data['order_date']);
                $insert_deleted_subscription_stmt->execute();
                $insert_deleted_subscription_stmt->close();

                $del_subscription_sql = "DELETE FROM `past_coffee_subscriptions` WHERE `past_subscription_id`=?;";
                $del_subscription_stmt = $this->db->prepare($del_subscription_sql);
                $del_subscription_stmt->bind_param('i', $subscription_id);
                $del_subscription_stmt->execute();
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
