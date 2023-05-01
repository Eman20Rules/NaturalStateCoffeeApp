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

    public function isSubscriptionDelValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            
            $user_coffee_subscription_id = $this->userData['user_coffee_subscription_id'];
           

            if ($user = $this->DelSubscription($userId, $user_coffee_subscription_id)) {
                return [
                    "success" => 1,
                    "message" => "Subscription updated",
                    "status" => 200
                ];
            } else {
                http_response_code(404);
                return [
                    "success" => 0,
                    "message" => "Error",
                    "status" => 404
                ];
            }
        } else {
            return [
                "success" => 0,
                "message" => "Token not found in request"
            ];
        }
    }

    public function DelSubscription($user_id, $user_coffee_subscription_id)
    {
        try {

            // Get the data from the original table before deleting it
            $get_subscription_sql = "SELECT * FROM `users_coffee_subscription` WHERE `user_id`=? AND `user_coffee_subscription_id`=?";
            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
            $get_subscription_stmt->bind_param('ii', $user_id, $user_coffee_subscription_id);
            $get_subscription_stmt->execute();
            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();

            // Insert the data into the deleted table
            $insert_deleted_subscription_sql = "INSERT INTO `deleted_users_coffee_subscription` (`user_id`, `amount`, `frequency`, `order_date`, `coffee_id`) VALUES (?, ?, ?, ?, ?)";
            $insert_deleted_subscription_stmt = $this->db->prepare($insert_deleted_subscription_sql);
            $insert_deleted_subscription_stmt->bind_param('iissi', $user_id, $subscription_data['amount'], $subscription_data['frequency'], $subscription_data['order_date'], $subscription_data['coffee_id']);
            $insert_deleted_subscription_stmt->execute();

            // Delete the data from the original table
            $delete_subscription_sql = "DELETE FROM `users_coffee_subscription` WHERE `user_id`=? AND `user_coffee_subscription_id`=?";
            $delete_subscription_stmt = $this->db->prepare($delete_subscription_sql);
            $delete_subscription_stmt->bind_param('ii', $user_id, $user_coffee_subscription_id);
            $delete_subscription_stmt->execute();


        return true; // Password updated successfully
    } catch (Exception $e) {
        return null;
    }
}
}
