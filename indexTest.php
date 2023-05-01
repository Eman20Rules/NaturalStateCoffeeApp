<?php

// Set content type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



require __DIR__ . '/database.php';




$db = new Database();
$db->dbConnection();

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  if (isset($_GET['method']) && $_GET['method'] === 'getCoffees') {
    require __DIR__ . '/read_coffee.php';
    $read_coffee = new ReadCoffee();
    $data = $read_coffee->read_coffee($db);
    echo json_encode($data);
    if (empty($data)) {
      $response = "No coffee data found";
    } else {
      $response = $data;
    }

  } elseif (isset($_GET['method']) && $_GET['method'] === 'getMyUserData') {
    require __DIR__ . '/myUserData.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders);
    echo json_encode($auth->isUserValid());

  } elseif (isset($_GET['method']) && $_GET['method'] === 'getMyUserSubscription') {
    require __DIR__.'/getMyUserSubscription.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders);
    echo json_encode($auth->isUserOrdersValid());

  }  

  elseif (isset($_GET['method']) && $_GET['method'] === 'getAdmins') {
    require __DIR__.'/view_admins.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders);
    echo json_encode($auth->isGetAdminsValid());

  }
  
  else {
    // No method specified
    http_response_code(400);
    $response = array('message' => 'No method specified');
  }
}


// Start of POST Methods
 elseif($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['method']) && $_GET['method'] === 'register') {
      require __DIR__ . '/register.php';
      $register = new register();
      $data = $register->register($db);
      echo json_encode($data);
      if (empty($data)) {
        $response = "Account creation failed";
    } else {
        $response = $data;
    }

    } else if (isset($_GET['method']) && $_GET['method'] === 'login') {
      require __DIR__ . '/login.php';
      $login = new login();
      $data = $login->login($db);
      echo json_encode($data);
      if (empty($data)) {
        $response = "Login Failed";
    } else {
        $response = $data;
    }

  } 
  
  else if (isset($_GET['method']) && $_GET['method'] === 'changePassword') {
    require __DIR__ . '/changePassword.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isPassChangeValid();
    echo json_encode($response);

}

  else if (isset($_GET['method']) && $_GET['method'] === 'changeAddress') {
      require __DIR__ . '/changeAddress.php';
      $allHeaders = getallheaders();
      $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
      $response = $auth->isAddChangeValid();
      echo json_encode($response);
  }

  else if (isset($_GET['method']) && $_GET['method'] === 'changeEmail') {
    require __DIR__ . '/changeEmail.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isEmailChangeValid();
    echo json_encode($response);
  }

  else if (isset($_GET['method']) && $_GET['method'] === 'modifySubscription') {
    require __DIR__ . '/modifySubscription.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isSubscriptionChangeValid();
    echo json_encode($response);
  }


  else if (isset($_GET['method']) && $_GET['method'] === 'submitSubscription') {
    require __DIR__ . '/submitSubscription.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isSubscriptionSubmissionValid();
    echo json_encode($response);
  }

  else if (isset($_GET['method']) && $_GET['method'] === 'deleteSubscription') {
    require __DIR__ . '/deleteSubscription.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isSubscriptionDelValid();
    echo json_encode($response);
  }

  else if (isset($_GET['method']) && $_GET['method'] === 'new_coffee') {
    require __DIR__ . '/new_coffee.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isCoffeeInsertValid();
    echo json_encode($response);
  }

  else if (isset($_GET['method']) && $_GET['method'] === 'del_coffee') {
    require __DIR__ . '/del_coffee.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isCoffeeDelValid();
    echo json_encode($response);
  }
  else if (isset($_GET['method']) && $_GET['method'] === 'forgotPassword') {
    require __DIR__ . '/sendEmailCode.php';
    $code = new sendEmailCode();
    $response = $code->sendCode($db);
    if (empty($response)) {
        $response = [
        "success" => 0,
        "message" => "An error has occurred",
        "status" => 404
    ];
    } 
    echo json_encode($response);
  }
  else if (isset($_GET['method']) && $_GET['method'] === 'resetPassword') {
    require __DIR__ . '/resetPassword.php';
    $allHeaders = getallheaders();
    $resetPassword = new resetPassword($db, $allHeaders, file_get_contents('php://input'));
    $response = $resetPassword->isPassResetValid();
    if (empty($response)) {
      $response = [
      "success" => 0,
      "message" => "An error has occurred",
      "status" => 404
    ];
    }
    echo json_encode($response);
  } 
  
  else if (isset($_GET['method']) && $_GET['method'] === 'update_orders') {
    require __DIR__ . '/update_orders.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders);
    $response = $auth->updateOrders();
    echo json_encode($response);
  } 
  
  else if (isset($_GET['method']) && $_GET['method'] === 'edit_coffee') {
    require __DIR__ . '/edit_coffee.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isCoffeeEditValid();
    echo json_encode($response);
  } 
  else if (isset($_GET['method']) && $_GET['method'] === 'mark_delivered') {
    require __DIR__ . '/mark_delivered.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isDeliveryMarkValid();
    echo json_encode($response);
  } 
  else if (isset($_GET['method']) && $_GET['method'] === 'mark_undelivered') {
    require __DIR__ . '/mark_undelivered.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isDeliveryUnmarkValid();
    echo json_encode($response);
  } 
  else if (isset($_GET['method']) && $_GET['method'] === 'create_admin') {
    require __DIR__ . '/create_admin.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isCreateAdminValid();
    echo json_encode($response);
  } 
  else if (isset($_GET['method']) && $_GET['method'] === 'remove_admin') {
    require __DIR__ . '/remove_admin.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    $response = $auth->isRemoveAdminValid();
    echo json_encode($response);
  } 

  elseif (isset($_GET['method']) && $_GET['method'] === 'getAllOrders') {
    require __DIR__.'/getAllOrders.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    echo json_encode($auth->isAdminOrdersValid());

  }

  elseif (isset($_GET['method']) && $_GET['method'] === 'getAllPastOrders') {
    require __DIR__.'/getAllPastOrders.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    echo json_encode($auth->isAdminOrdersValid());

  }
  elseif (isset($_GET['method']) && $_GET['method'] === 'mark_past_order_undelivered') {
    require __DIR__.'/mark_past_order_undelivered.php';
    $allHeaders = getallheaders();
    $auth = new Auth($db, $allHeaders, file_get_contents('php://input'));
    echo json_encode($auth->isDeliveryUnmarkValid());

  }


}

else {
  // Method not allowed
  http_response_code(405);
  $response = array('message' => 'Method not allowed');
}

// Close database connection
$db->close();
?>