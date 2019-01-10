<?php

$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "root";
$dbName = "project";

$connect = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
$connect->query("set NAMES utf8");