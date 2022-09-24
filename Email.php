<?php
if(!isset($_POST['submit']))
{
    //This page should not be accessed directly. Need to submit the form.
    echo "<body style='background-color:#111;margin:0;'><div style='position:absolute;width:100%;top:0;left:0;text-align:center;'><span style='position:relative;color:#FFF;font-family:Verdana,Georgia;font-size:30px;'><br />You need to submit the form!<br /></span>";
}
$name = $_POST['NameFandL'];
$visitor_email = $_POST['EmailAdd'];
$message = $_POST['MessAround'];
//Validate first
if(empty($name)||empty($visitor_email))
{
    echo "<span style='position:relative;color:#FFF;font-family:Verdana,Georgia;font-size:15px;'>Name and email are mandatory!<br /><br /></span><a style='color:#98101E;text-decoration:none;font-family:Verdana;font-size:20px;' href='index.html'>Go Back</a></div></body>";
    exit;
}
$email_from = 'windtunnel97@gmail.com';//<== Put your email address here
$email_subject = "New Form submission";
$email_body = "You have received a new message from the user $name.\n".
    "email address: $visitor_email\n".
    "Here is the message:\n $message".
$to = "windtunnel97@gmail.com";//<== Put your email address here
$headers = "From $email_from \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.
?>
