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

    public function isSubscriptionChangeValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            $new_quantity = $this->userData['new_quantity'];
            $new_frequency = $this->userData['new_frequency'];
            $user_coffee_subscription_id = $this->userData['user_coffee_subscription_id'];
           

            if ($user = $this->updateSubscription($userId, $new_quantity, $new_frequency, $user_coffee_subscription_id)) {
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

    public function updateSubscription($user_id, $new_quantity, $new_frequency, $user_coffee_subscription_id)
    {
        try {

            // Update password
            $update_address_sql = "UPDATE `users_coffee_subscription` SET `amount`=?, `frequency`=? WHERE `user_id`=? && `user_coffee_subscription_id`=?";
            $update_address_sql = $this->db->prepare($update_address_sql);
            $update_address_sql->bind_param('isii', $new_quantity, $new_frequency, $user_id, $user_coffee_subscription_id);
            $update_address_sql->execute();

        return true; // Password updated successfully
    } catch (Exception $e) {
        return null;
    }
}
}
