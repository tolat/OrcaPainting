
<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $myemail = 'info@orcapainting.com';
    $to = $myemail;

    $email_subject = "Orca Painting inquiry";
    $email_body = "From: $name \n".
    "Email: $visitor_email \n Phone: $phone \n \n \n $message\n ";

    $headers = "From: $myemail\n";
    $headers .= "Reply-To: $email_address";
    mail($to,$email_subject,$email_body,$headers);
    
?>



