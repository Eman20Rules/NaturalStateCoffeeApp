<?php

class Auth
{
    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function updateOrders()
    {
        

            if ($orders = $this->fetchUserOrders()) {
                return [
                    "success" => 1,
                    "orders" => $orders,
                    "status" => 200
                ];
            } else {
                return [
                    "success" => 0,
                    "message" => "Orders not found",
                    "status" => 400
                ];
            }
    }

    protected function fetchUserOrders()
    {
        try {
            $fetch_user_orders = "SELECT * FROM `users_coffee_subscription` WHERE `delivered` = ?";
            $delivered = 1;
            $new_delivery = 0;
            $query_stmt = $this->db->prepare($fetch_user_orders);
            $query_stmt->bind_param('i', $delivered);
            $query_stmt->execute();

            $result = $query_stmt->get_result();
            
            if ($result->num_rows > 0) {
                // Loop through the results and update the order_date based on frequency
                while ($row = $result->fetch_assoc()) {
                    $user_coffee_subscription_id = $row['user_coffee_subscription_id'];
                    $frequency = $row['frequency'];
                    $order_date = $row['order_date'];

                    if (strtotime($order_date) <= strtotime('today')) {
                            // Calculate the new order date based on frequency
                        if ($frequency == 'weekly') {
                            $new_date = date('Y-m-d', strtotime($order_date . ' + 1 week'));

                            $get_subscription_sql = "SELECT * FROM `users_coffee_subscription` WHERE `user_coffee_subscription_id`=?";
                            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
                            $get_subscription_stmt->bind_param('i', $user_coffee_subscription_id);
                            $get_subscription_stmt->execute();
                            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();

                            // Insert the subscription data into the past_coffee_subscriptions table
                            $insert_deleted_subscription_sql = "INSERT INTO `past_coffee_subscriptions` (`user_id`, `frequency`, `amount`, `coffee_id`, `order_date`) VALUES (?, ?, ?, ?, ?)";
                            $insert_deleted_subscription_stmt = $this->db->prepare($insert_deleted_subscription_sql);
                            $insert_deleted_subscription_stmt->bind_param('isiis', $subscription_data['user_id'], $subscription_data['frequency'], $subscription_data['amount'], $subscription_data['coffee_id'], $subscription_data['order_date']);
                            $insert_deleted_subscription_stmt->execute();
                            $insert_deleted_subscription_stmt->close();

                            // Update the order_date in the database
                            $update_sql = "UPDATE `users_coffee_subscription` SET `order_date` = ?, `delivered` = ? WHERE `user_coffee_subscription_id` = ?";
                            $update_stmt = $this->db->prepare($update_sql);
                            $update_stmt->bind_param('sii', $new_date, $new_delivery, $user_coffee_subscription_id);
                            $update_stmt->execute();
                            
                        } else if ($frequency == 'monthly') {
                            $new_date = date('Y-m-d', strtotime($order_date . ' + 1 month'));

                            $get_subscription_sql = "SELECT * FROM `users_coffee_subscription` WHERE `user_coffee_subscription_id`=?";
                            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
                            $get_subscription_stmt->bind_param('i', $user_coffee_subscription_id);
                            $get_subscription_stmt->execute();
                            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();

                            // Insert the subscription data into the past_coffee_subscriptions table
                            $insert_deleted_subscription_sql = "INSERT INTO `past_coffee_subscriptions` (`user_id`, `frequency`, `amount`, `coffee_id`, `order_date`) VALUES (?, ?, ?, ?, ?)";
                            $insert_deleted_subscription_stmt = $this->db->prepare($insert_deleted_subscription_sql);
                            $insert_deleted_subscription_stmt->bind_param('isiis', $subscription_data['user_id'], $subscription_data['frequency'], $subscription_data['amount'], $subscription_data['coffee_id'], $subscription_data['order_date']);
                            $insert_deleted_subscription_stmt->execute();
                            $insert_deleted_subscription_stmt->close();

                            // Update the order_date in the database
                            $update_sql = "UPDATE `users_coffee_subscription` SET `order_date` = ?, `delivered` = ? WHERE `user_coffee_subscription_id` = ?";
                            $update_stmt = $this->db->prepare($update_sql);
                            $update_stmt->bind_param('sii', $new_date, $new_delivery, $user_coffee_subscription_id);
                            $update_stmt->execute();

                        } else if ($frequency == 'one-time') {

                            // Get the data from the original table before deleting it
                            $get_subscription_sql = "SELECT * FROM `users_coffee_subscription` WHERE `user_coffee_subscription_id`=?";
                            $get_subscription_stmt = $this->db->prepare($get_subscription_sql);
                            $get_subscription_stmt->bind_param('i', $user_coffee_subscription_id);
                            $get_subscription_stmt->execute();
                            $subscription_data = $get_subscription_stmt->get_result()->fetch_assoc();

                            // Insert the subscription data into the past_coffee_subscriptions table
                            $insert_deleted_subscription_sql = "INSERT INTO `past_coffee_subscriptions` (`user_id`, `frequency`, `amount`, `coffee_id`, `order_date`) VALUES (?, ?, ?, ?, ?)";
                            $insert_deleted_subscription_stmt = $this->db->prepare($insert_deleted_subscription_sql);
                            $insert_deleted_subscription_stmt->bind_param('isiis', $subscription_data['user_id'], $subscription_data['frequency'], $subscription_data['amount'], $subscription_data['coffee_id'], $subscription_data['order_date']);
                            $insert_deleted_subscription_stmt->execute();
                            $insert_deleted_subscription_stmt->close();

                            // Delete the data from the original table
                            $delete_subscription_sql = "DELETE FROM `users_coffee_subscription` WHERE `user_coffee_subscription_id`=?";
                            $delete_subscription_stmt = $this->db->prepare($delete_subscription_sql);
                            $delete_subscription_stmt->bind_param('i', $user_coffee_subscription_id);
                            $delete_subscription_stmt->execute();
                        }
                    }

                    

                    
                }
            }
            

            if ($result->num_rows) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return null;
        }
    }
}
