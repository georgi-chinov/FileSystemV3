<?php
require 'dbnfo.php';
session_start();
$foldername = $_POST['foldername'];

$conn = new PDO("mysql:host=$servername; dbname=filesystemv2",$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->prepare("INSERT INTO folders (foldername) VALUES('$foldername')");
$stmt-> execute();
echo json_encode('Done');
