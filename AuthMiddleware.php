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

    public function isValid()
{
    if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
        $data = $this->jwtDecodeData($matches[1]);
        var_dump($data);
        $userId = $data[1];
        var_dump($userId);

        if ($user = $this->fetchUser($userId)) {
            return [
                "success" => 1,
                "user" => $user
            ];
        } else {
            return [
                "success" => 0,
                "message" => "User not found",
            ];
        }
    } else {
        return [
            "success" => 0,
            "message" => "Token not found in request"
        ];
    }
}


    protected function fetchUser($user_id)
    {
        try {
            $fetch_user_by_id = "SELECT * FROM `users` WHERE `user_id`=?";
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
