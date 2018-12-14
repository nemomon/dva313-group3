<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



 $query = "INSERT INTO Allocation ( personId , projectId, Percentage, StartDate, EndDate)
VALUES (".$_POST['personId'].", ".$_POST['projectId'].", ".$_POST['Percentage'].", ".$_POST['StartDate'].",  ".$_POST['EndDate'].")";

if ($connect->query($query) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $query . "<br>" . $connect->error;
}



?>