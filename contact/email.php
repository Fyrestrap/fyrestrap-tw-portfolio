<?php

// Change the following to your email address to which you want the emails delivered
$to = "johndoe@example.com";

// Change the following to the subject you want
$subject = "Email via my website";

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST['first_name']) &&
    isset($_POST['last_name']) &&
    isset($_POST['email'])     &&
    isset($_POST['phone'])     &&
    isset($_POST['message'])) {

    $first_name     = $_POST['first_name'];
    $last_name      = $_POST['last_name'];
    $email_address  = $_POST['email'];
    $phone          = $_POST['phone'];
    $message        = $_POST['message'];

    // -- Message content --
    $text  = "From: ". $first_name. " ". $last_name. "\n";
    $text .= "Email: ". $email_address. "\n\n";
    $text .= "Phone number: ". $phone. "\n\n";
    
    $message = wordwrap($message, 70);
    $message = $text. $message;
        
    $headers = "From: webmaster@example.com". "\r\n";
    $headers .= "Reply-To: $email_address";  
        
    mail($to, $subject, $message, $headers);
    echo "success";
} else {
    echo "error";
}

?>