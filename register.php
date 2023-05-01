<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/JwtHandler.php';

class register{
    function register(Database $db) {

        // Define a function to format response messages
        function msg($success, $status, $message, $extra = []) {
            $data = [
                'success' => $success,
                'status' => $status,
                'message' => $message
            ];
            return array_merge($data, $extra);
        }

        // Get data from request body
        $data = json_decode(file_get_contents("php://input"));

        // Initialize response data
        $returnData = [];

        // Check the HTTP request method
        if ($_SERVER["REQUEST_METHOD"] != "POST") {
            $returnData = msg(0, 404, 'Page Not Found!');
        } elseif (
            // Check for required fields
            !isset($data->name)
            || !isset($data->email)
            || !isset($data->password)
            || empty(trim($data->name))
            || empty(trim($data->email))
            || empty(trim($data->password))
        ) {
            $fields = ['fields' => ['name', 'email', 'password']];
            $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
        } else {
            // Get values from request data
            $name = trim($data->name);
            $email = trim($data->email);
            $password = trim($data->password);
            $username = isset($data->username) ? trim($data->username) : "";
            $is_admin = 0;
            $street = isset($data->street) ? trim($data->street) : "";
            $city = isset($data->city) ? trim($data->city) : "";
            $state = isset($data->state) ? trim($data->state) : "";
            $country = isset($data->country) ? trim($data->country) : "";
            $zipcode = isset($data->zipcode) ? trim($data->zipcode) : "";
        }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $returnData = msg(0, 422, 'Invalid Email Address!');
            } elseif (strlen($password) < 8) {
                $returnData = msg(0, 422, 'Your password must be at least 8 characters long!');
            } elseif (strlen($name) < 3) {
                $returnData = msg(0, 422, 'Your name must be at least 3 characters long!');
            } else {
                try {
                    $check_email = "SELECT `email` FROM `users` WHERE `email`=?";
                    $check_email_stmt = $db->prepare($check_email);
                    $check_email_stmt->bind_param("s", $email);
                    $check_email_stmt->execute();
                    $check_email_stmt->store_result();

                    if ($check_email_stmt->num_rows > 0) {
                        $returnData = msg(0, 422, 'This E-mail already in use!');
                    } else {
                        // Sanitize input data
                        $password = password_hash($password, PASSWORD_DEFAULT);
                        $name = htmlspecialchars(strip_tags($name));
                        $email = htmlspecialchars(strip_tags($email));
                        $is_admin = intval($is_admin);
                        $street = htmlspecialchars(strip_tags($street));
                        $city = htmlspecialchars(strip_tags($city));
                        $state = htmlspecialchars(strip_tags($state));
                        $country = htmlspecialchars(strip_tags($country));
                        $zipcode = htmlspecialchars(strip_tags($zipcode));

                        // Prepare SQL statement
                        $insert_stmt = $db->prepare("INSERT INTO users (password, name, email, is_admin, street, city, state, country, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

                        // Bind parameters with types
                        $insert_stmt->bind_param("sssissssi", $password, $name, $email, $is_admin, $street, $city, $state, $country, $zipcode);

                        // Execute the statement
                        $insert_stmt->execute();

                        if ($insert_stmt->affected_rows == 1) {
                            $last_inserted_id = $insert_stmt->insert_id;
                            $jwt = new JwtHandler();
                            $token = $jwt->jwtEncodeData(
                                'http://localhost/api/',
                                array("0" => "user_id", "1" => $last_inserted_id)
                            );

                            $returnData = msg(1, 201, 'You have registered successfully.', ['token' => $token]);
                        } else {
                            $returnData = msg(0, 500, 'Failed to register, please try again.');
                        }
                    }
                } catch (Exception $e) {
                    $returnData = msg(0, 500, $e->getMessage());
                }
            }

        // RETURN MESSAGE TO THE CLIENT
        header('Content-Type: application/json');
        return $returnData;
    }
}