<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$name = $_POST['name'];
$city = $_POST['city'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];
$file = $_FILES['file'];
$files = $_FILES['files'];


// Формирование самого письма
$title = "Связаться со службой поддержки | Plonq.ru";

$body = "
            <table style='width: 100%;'>
            <tr style='background-color: #f8f8f8;'>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$name</td>
            </tr>
            <tr style='background-color: #f8f8f8;'>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Город</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$city</td>
            </tr>
            <tr style='background-color: #f8f8f8;'>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Email</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$email</td>
            </tr>
            <tr style='background-color: #f8f8f8;'>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$phone</td>
            </tr>
            <tr style='background-color: #f8f8f8;'>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Сообщение</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>$message</td>
            </tr>
        </table>
    ";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->isSMTP();
$mail->CharSet = "UTF-8";
$mail->Host = 'smtp.office365.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = 'dev@goplonq.com';
$mail->Password = 'Qop26958';
$mail->SetFrom('dev@goplonq.com', 'Служба поддержки | Plonq.ru');
$mail->addAddress('support@plonq.ru', 'ToEmail');
$mail->SMTPDebug  = 3;
$mail->Debugoutput = function($str, $level) {echo "debug level $level; message: $str";}; //$mail->Debugoutput = 'echo';

if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        }
    }   
}

if (!empty($files['name'][0])) {
    for ($ct = 0; $ct < count($files['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($files['name'][$ct]));
        $filename = $files['name'][$ct];
        if (move_uploaded_file($files['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        }
    }   
}

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {
    $result = "success";
} else {
    $result = "error";
}

// Отображение результата
//echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
