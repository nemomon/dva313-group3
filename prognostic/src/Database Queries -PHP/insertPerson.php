<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



 $query = "INSERT INTO Person (Name, Salary, SocialFactor, IncrementFactor)
VALUES ('".$_POST['Name']."', ".$_POST['Salary'].", ".$_POST['SocialFactor'].", ".$_POST['IncrementFactor'].")";

if ($connect->query($query) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $query . "<br>" . $connect->error;
}



?>