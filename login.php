<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/JwtHandler.php';

class login{
    function login(Database $db) {

        function msg($success, $status, $message, $extra = []) {
            return array_merge([
                'success' => $success,
                'status' => $status,
                'message' => $message
            ], $extra);
        }

        $data = json_decode(file_get_contents("php://input"));
        $returnData = [];

        // IF REQUEST METHOD IS NOT EQUAL TO POST
        if ($_SERVER["REQUEST_METHOD"] != "POST") {
            $returnData = msg(0, 404, 'Page Not Found!');
        } else {
            // CHECKING EMPTY FIELDS
            if (!isset($data->email)
                || !isset($data->password)
                || empty(trim($data->email))
                || empty(trim($data->password))) {
                $fields = ['fields' => ['email','password']];
                $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
            } else {
                $email = trim($data->email);
                $password = trim($data->password);

                // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
                    $returnData = msg(0, 422, 'Invalid Email Address or password');
                } else {
                    $fetch_user_by_email = "SELECT * FROM `users` WHERE `email`=?";
                    $query_stmt = $db->prepare($fetch_user_by_email);
                    $query_stmt->bind_param('s', $email);
                    $query_stmt->execute();
                    $result = $query_stmt->get_result();
                    
                    $query = "SELECT `is_admin` FROM `users` WHERE `email` = ?";
                    $stmt = $db->prepare($query);
                    $stmt->bind_param("s", $email);
                    $stmt->execute();

                    // Get result
                    $result2 = $stmt->get_result();
                    $is_admin = $result2->fetch_assoc()["is_admin"];

                    // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
                    if ($result->num_rows == 1) {
                        $row = $result->fetch_assoc();
                        $password_hash = $row['password'];
                        if (password_verify($password, $password_hash)) {
                            // The password is correct, so send the login token
                            $jwt = new JwtHandler();
                            $token = $jwt->jwtEncodeData(
                                'http://localhost/api/',
                                array("user_id", $row['user_id'],
                                )
                                
                            );
                            $returnData = msg(1, 200, 'You have logged in successfully.', ['token' => $token, 'is_admin' => $is_admin], );
                            } else {
                            // If password is incorrect
                            $returnData = msg(0, 422, 'Invalid Email Address or Password!');
                            }
                            } else {
                            // If email doesn't exist in database
                            $returnData = msg(0, 422, 'Invalid Email Address or Password!');
                            }
                        }
                    }
                }
                            
    return $returnData;
    }
 }
