<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



 $query = "INSERT INTO Allocation ( personId , projectId, Percentage, StartDate, EndDate)
VALUES (".$_POST['personId'].", ".$_POST['projectId'].", ".$_POST['Percentage'].", '".$_POST['StartDate']."',  '".$_POST['EndDate']."')";

if ($connect->query($query) === TRUE) {
    $last_id = $connect->insert_id;
    echo $last_id;
} else {
    echo "Error: " . $query . "<br>" . $connect->error;
}



?>