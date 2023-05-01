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

    public function isPassChangeValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
            $userId = $data[1];
            $current_password = $this->userData['current_password'];
            $new_password = $this->userData['new_password'];
            $confirm_password = $this->userData['confirm_password'];

            if ($user = $this->updatePassword($userId, $current_password, $new_password, $confirm_password)) {
                return [
                    "success" => 1,
                    "message" => "Password updated",
                    "status" => 200
                ];
            } else {
                http_response_code(404);
                return [
                    "success" => 0,
                    "message" => "Incorrect password or passwords did not match",
                    "status" => 404
                ];
            }
        } else {
            return [
                "success" => 0,
                "message" => "Token not found in request",
                "status" => 404
            ];
        }
    }

    public function updatePassword($user_id, $current_password, $new_password, $confirm_password)
    {
        if ($new_password !== $confirm_password) {
            return false; // new password and confirmation password do not match
        }
        try {
            // Check if current password is correct
            $check_password_sql = "SELECT `password` FROM `users` WHERE `user_id`=?";
            $check_password_stmt = $this->db->prepare($check_password_sql);
            $check_password_stmt->bind_param('i', $user_id);
            $check_password_stmt->execute();
            $result = $check_password_stmt->get_result();
            if ($result->num_rows) {
                $row = $result->fetch_assoc();
                if (!password_verify($current_password, $row['password'])) {
                    return false; // Passwords don't match, return false
                }
            } else {
                return false; // User not found, return false
            }

            // Update password
            $update_password_sql = "UPDATE `users` SET `password`=? WHERE `user_id`=?";
            $update_password_stmt = $this->db->prepare($update_password_sql);
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $update_password_stmt->bind_param('si', $hashed_password, $user_id);
            $update_password_stmt->execute();

        return true; // Password updated successfully
    } catch (Exception $e) {
        return null;
    }
}
}
