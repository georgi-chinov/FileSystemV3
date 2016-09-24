<?php
require 'dbnfo.php';
session_start();

$conn = new PDO("mysql:host=$servername; dbname=filesystemv2",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("SELECT * FROM folders");
$stmt-> execute();
$result = $stmt->fetchAll(PDO::FETCH_NUM);
echo json_encode($result);
