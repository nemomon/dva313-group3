<?php

$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "prognosticdb";

$connect = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
$connect->query("set NAMES utf8");