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

    public function isUserOrdersValid()
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
            $fetch_user_orders = "SELECT ucs.`user_coffee_subscription_id`, ucs.`frequency`, ucs.`amount`, ucs.`coffee_id`, ucs.`order_date`,
            c.`coffee_name`, c.`coffee_image`, c.`price`
            FROM `users_coffee_subscription` ucs
            JOIN `Tcoffee` c ON ucs.`coffee_id` = c.`coffee_id`
            WHERE ucs.`user_id` = ?
     ";
            $query_stmt = $this->db->prepare($fetch_user_orders);
            $query_stmt->bind_param('i', $user_id);
            $query_stmt->execute();

            $result = $query_stmt->get_result();

            if ($result->num_rows) {
                return $result->fetch_all(MYSQLI_ASSOC);
            } else {
                return false;
            }
        } catch (Exception $e) {
            return null;
        }
    }
}
