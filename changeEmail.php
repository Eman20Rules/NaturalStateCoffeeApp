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

    public function isEmailChangeValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];
            $new_email = $this->userData['new_email'];
            $confirm_email = $this->userData['confirm_email'];
           
            if (!filter_var($new_email, FILTER_VALIDATE_EMAIL)) {
                return [
                    "success" => 0,
                    "message" => "Email not in correct format",
                    "status" => 200
                ];
            } else {
            

            if ($user = $this->updateEmail($userId, $new_email, $confirm_email)) {
                return [
                    "success" => 1,
                    "message" => "Email updated",
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
        }
        } else {
            return [
                "success" => 0,
                "message" => "Token not found in request"
            ];
        }
    }

    public function updateEmail($user_id, $new_email, $confirm_email)
    {
        if ($new_email !== $confirm_email) {
            return false; // new password and confirmation password do not match
        }
        try {
 
            // Update password
            $update_address_sql = "UPDATE `users` SET `email`=? WHERE `user_id`=?";
            $update_address_sql = $this->db->prepare($update_address_sql);
            $update_address_sql->bind_param('si', $new_email, $user_id);
            $update_address_sql->execute();
            return true; // Password updated successfully
        }

       
        catch (Exception $e) {
        return null;
    }
}
}

