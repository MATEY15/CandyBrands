<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$filepath = '';
$filename = '';

$name = substr($_POST['name'], 0, 64);
$phone = substr($_POST['phone'], 0, 64);
$email = substr($_POST['email'], 0, 64);
$message = substr($_POST['message'], 0, 250);

if (!empty($_FILES['file']['tmp_name']) and $_FILES['file']['error'] == 0) {
    $filepath = $_FILES['file']['tmp_name'];
    $filename = $_FILES['file']['name'];
} else {
    $filepath = '';
    $filename = '';
}

if (!empty($_FILES['file-2']['tmp_name']) and $_FILES['file-2']['error'] == 0) {
    $filepath2 = $_FILES['file-2']['tmp_name'];
    $filename2 = $_FILES['file-2']['name'];
} else {
    $filepath2 = '';
    $filename2 = '';
}
// Формирование самого письма
$title = "Подписка (Subscribe) | Plonq.ru";
$body = "
            <table style='width: 100%;'>
        <tr style='background-color: #f8f8f8;'>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Подписка</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$email</td>
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
$mail->SetFrom('dev@goplonq.com', 'FromEmail');
$mail->addAddress('sub@plonq.ru', 'ToEmail');
//$mail->SMTPDebug  = 3;
//$mail->Debugoutput = function($str, $level) {echo "debug level $level; message: $str";}; //$mail->Debugoutput = 'echo';

// Прикрипление файлов к письму
if (!empty($filename)) {
    $mail->addAttachment($filepath, $filename);
}

// Прикрипление файлов к письму
if (!empty($filename2)) {
    $mail->addAttachment($filepath2, $filename2);
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