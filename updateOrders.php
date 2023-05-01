<?php
require __DIR__ . '/JwtHandler.php';

class Auth extends JwtHandler
{
    protected $db;
  

    public function __construct($db)
    {
        parent::__construct();
        $this->db = $db;
    }

    public function updateOrders()
    {
        $current_date = date('Y-m-d');

        // Check if the database connection was successful
        // Check if the database connection was successful
        

        // Query the database for rows that have been delivered
        $query = "SELECT * FROM `users_coffee_subscription` WHERE `delivered` = ?";
        $delivered = 1;
        $result = $this->db->prepare($query);
        $result->bind_param('i', $delivered);
       

        // Check if the query was executed successfully
        if (!$result->execute()) {
            die("Query failed: " . $this->db->error);
        }

        var_dump($result);

        // Check if any rows were returned
        if ($result->num_rows > 0) {
            // Loop through the results and update the order_date based on frequency
            while ($row = $result->fetch_assoc()) {
                var_dump($row);
                $user_coffee_subscription_id = $row['user_coffee_subscription_id'];
            $frequency = $row['frequency'];
            $order_date = $row['order_date'];
            echo($frequency);

            // Calculate the new order date based on frequency
            if ($frequency == 'weekly') {
                $new_date = date('Y-m-d', strtotime($order_date . ' + 1 week'));
            } else if ($frequency == 'monthly') {
                $new_date = date('Y-m-d', strtotime($order_date . ' + 1 month'));
            } else if ($frequency == 'one-time') {

                // Get the data from the original table before deleting it
                $get_subscription_sql = "SELECT * FROM `users_coffee_subscription` WHERE `user_coffee_subscription_id`=?";
                $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
                $get_subscription_stmt->bind_param('i', $user_coffee_subscription_id);
                $get_subscription_stmt->execute();
                $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();

                // Insert the data into the deleted table
                $insert_deleted_subscription_sql = "INSERT INTO `deleted_users_coffee_subscription` (`user_id`, `amount`, `frequency`, `length`, `coffee_id`) VALUES (?, ?, ?, ?, ?)";
                $insert_deleted_subscription_stmt = $this->db->prepare($insert_deleted_subscription_sql);
                $insert_deleted_subscription_stmt->bind_param('iissi', $subscription_data['user_id'], $subscription_data['amount'], $subscription_data['frequency'], $subscription_data['length'], $subscription_data['coffee_id']);
                $insert_deleted_subscription_stmt->execute();

                // Delete the data from the original table
                $delete_subscription_sql = "DELETE FROM `users_coffee_subscription` WHERE `user_coffee_subscription_id`=?";
                $delete_subscription_stmt = $this->db->prepare($delete_subscription_sql);
                $delete_subscription_stmt->bind_param('i', $user_coffee_subscription_id);
                $delete_subscription_stmt->execute();
            }

            // Update the order_date in the database
            $update_sql = "UPDATE `users_coffee_subscription` SET `order_date` = ? WHERE `user_coffee_subscription_id` = ?";
            $update_stmt = $this->db->prepare($update_sql);
            $update_stmt->bind_param('si', $new_date, $user_coffee_subscription_id);
            $update_stmt->execute();
            }
        }
    }
}