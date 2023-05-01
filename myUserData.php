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

    public function isUserValid()
{
    if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
        $data = $this->jwtDecodeData($matches[1]);
        $userId = $data[1];

        if ($user = $this->fetchUser($userId)) {
            return [
                "success" => 1,
                "user" => $user,
                "status" => 200
            ];
        } else {
            return [
                "success" => 0,
                "message" => "User not found",
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


    protected function fetchUser($user_id)
    {
        try {
            $fetch_user_by_id = "SELECT `name`,`street`,`city`,`state`,`country`,`zipcode` FROM `users` WHERE `user_id`=?";
            $query_stmt = $this->db->prepare($fetch_user_by_id);
            $query_stmt->bind_param('i', $user_id);
            $query_stmt->execute();

            $result = $query_stmt->get_result();

            if ($result->num_rows) {
                return $result->fetch_assoc();
            } else {
                return false;
            }
        } catch (Exception $e) {
            return null;
        }
    }
}
