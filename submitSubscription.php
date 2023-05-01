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

    public function isSubscriptionSubmissionValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];

            $coffee_id = $this->userData['coffee_id'];
            $frequency = $this->userData['frequency'];
            $amount = $this->userData['amount'];

           

            if ($user = $this->submitSubscription($userId, $coffee_id, $frequency, $amount)) {
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
                "message" => "Token not found in request",
                "status" => 400
            ];
        }
    }

    public function submitSubscription($user_id, $coffee_id, $frequency, $amount)
    {
        try {

            // Calculate the date to use for the order
            if ($frequency == 'weekly') {
                $date = date('Y-m-d', strtotime('+1 week'));
            } elseif ($frequency == 'monthly') {
                $date = date('Y-m-d', strtotime('+1 month'));
            } elseif ($frequency == 'one-time') {
                // Default to current date
                $date = date('Y-m-d', strtotime('+2 week'));
            }else{
                return false;
            }

            // Insert the subscription record with the calculated date
            $update_address_sql = "INSERT INTO `users_coffee_subscription` (`coffee_id`, `frequency`, `amount`, `user_id`, `order_date`) VALUES (?, ?, ?, ?, ?)";
            $update_address_sql = $this->db->prepare($update_address_sql);
            $update_address_sql->bind_param('isiss', $coffee_id, $frequency, $amount, $user_id, $date);
            $update_address_sql->execute();

        return true; // Password updated successfully
    } catch (Exception $e) {
        return null;
    }
}
}
