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

    public function isCreateAdminValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            $email = $this->userData['email'];
            

            if ($orders = $this->insertCoffee($userId, $email)) {
                return [
                    "success" => 1,
                    "orders" => "Admin Created",
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Admin could not be created",
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

    protected function insertCoffee($user_id, $email)
    {
        try {


            $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('i', $user_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
            

            if ($subscription_data['is_admin'] == 1) {
                // Code to execute if user is an admin
                $update_is_admin = "UPDATE `users`
                    SET `is_admin` = 1
                    WHERE `email` = ?";
                    $query_stmt = $this->db->prepare($update_is_admin);
                    $query_stmt->bind_param('s', $email);
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
