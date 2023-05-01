<?php
require __DIR__ . '/JwtHandler.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

    public function isAddChangeValid()
    {
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            
            $token = $matches[1];
            $decoded_token = $this->jwtDecodeData($token);

            if (!$decoded_token) {
                return [
                    "success" => 0,
                    "message" => "Invalid token",
                    "status" => 401
                ];
            }

            $userId = $decoded_token[1];

            $data = json_decode(file_get_contents("php://input"));
            
            $new_street = $this->userData['new_street'];
            $new_city = $this->userData['new_city'];
            $new_state = $this->userData['new_state'];
            $new_zip = $this->userData['new_zip'];
            $new_country = $this->userData['new_country'];
         

            if ($user = $this->updateAddress($userId, $new_street, $new_city, $new_state, $new_zip, $new_country)) {
                return [
                    "success" => 1,
                    "message" => "Address updated",
                    "status" => 200
                ];
            } else {
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

    public function updateAddress($user_id, $new_street, $new_city, $new_state, $new_zip, $new_country )
    {
        try {

            // Update password
            $update_address_sql = "UPDATE `users` SET `Street`=?, `City`=?, `State`=?, `Zipcode`=?, `Country`=? WHERE `user_id`=?";
            $update_address_sql = $this->db->prepare($update_address_sql);
            $update_address_sql->bind_param('sssssi', $new_street, $new_city, $new_state, $new_zip, $new_country, $user_id);
            $update_address_sql->execute();

        return true; // Password updated successfully
    } catch (Exception $e) {
        return null;
    }
}
}
