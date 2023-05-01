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

    public function isAdminOrdersValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            $date = $this->userData['date'];

            if ($orders = $this->fetchUserOrders($userId, $date)) {
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

    protected function fetchUserOrders($user_id, $date)
{
    try {
        $get_subscription_sql = "SELECT is_admin FROM users WHERE user_id = ?";
        $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
        $get_subscription_stmt->bind_param('i', $user_id);
        $get_subscription_stmt->execute();
        $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();
        
        if ($subscription_data['is_admin'] == 1) {
            // Code to execute if user is an admin
            $fetch_user_orders = "SELECT ucs.*, u.name, u.email, u.street, u.city, u.state, u.country, u.zipcode, c.coffee_name 
            FROM `users_coffee_subscription` ucs 
            JOIN `users` u ON ucs.user_id = u.user_id 
            JOIN `Tcoffee` c ON ucs.coffee_id = c.coffee_id
            WHERE DATE_FORMAT(order_date, '%m/%Y') = ?
            ";

            $query_stmt = $this->db->prepare($fetch_user_orders);

            // Bind the month and year parameters
            $query_stmt->bind_param("s", $date);

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
    
    return [];
}

}
