<?php

try {
    $db = new PDO(
        "mysql:host=localhost;dbname=trem_global", "root", "root");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    switch($_GET['action']){
        case 'addUser':
            if(empty($_POST['fullName'])||empty($_POST['email'])||empty($_POST['phone'])||empty($_POST['address'])){
                throw new Exception("Lütfen tüm alanları doldurunuz.");
            } elseif(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception("E-Posta Adresi Hatalı.");
              }else{
                $name = $_POST['fullName'];
                $email = $_POST['email'];
                $phone = $_POST['phone'];
                $address = $_POST['address'];
              }
        
            $insert = $db->prepare("INSERT INTO users (full_name, email, phone, address) VALUES (?,?,?,?)");
            $insert->execute([$name, $email, $phone, $address]);
            echo json_encode(["status" => "success", "message" => "Kayıt Başarılı"]);
            break;

        case 'getUsers':
            $query = $db->query("SELECT * FROM users", PDO::FETCH_ASSOC);
            if($query->rowCount()){
                $data = $query->fetchAll();
                echo json_encode(["status" => "success", "data" => $data]);
            } else {
                throw new Exception("Kayıt Bulunamadı.");
            }
            break;
            default:
                throw new Exception("Geçersiz İşlem.");
    }


}  catch(Exception $e) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}