<?php
require __DIR__ . '/JwtHandler.php';

class Auth extends JwtHandler
{
    protected $db;
    protected $headers;
    protected $token;

    public function __construct($db, $headers)
    {
        parent::__construct();
        $this->db = $db;
        $this->headers = $headers;
    }

    public function isGetAdminsValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            if ($orders = $this->fetchUserOrders($userId)) {
                return [
                    "success" => 1,
                    "orders" => $orders,
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Orders not found",
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

    protected function fetchUserOrders($user_id)
    {
        try {
            $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('i', $user_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
        
        if ($subscription_data['is_admin'] == 1) {
            // Code to execute if user is an admin
            $fetch_user_orders = "SELECT `user_id`, email FROM users WHERE is_admin = 1";

            $query_stmt = $this->db->prepare($fetch_user_orders);

            $query_stmt->execute();
            $result = $query_stmt->get_result();
    
            if ($result) {
                $orders = $result->fetch_all(MYSQLI_ASSOC);
                return $orders ?: [];
            }
        }
        } catch (Exception $e) {
            return null;
        }
    }
}
