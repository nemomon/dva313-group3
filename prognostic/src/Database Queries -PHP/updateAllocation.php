<?php  

session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



$query = "UPDATE Allocation SET  Percentage = ".$_POST['Percentage'].", StartDate= '".$_POST['StartDate']."', EndDate = '".$_POST['EndDate']."'  WHERE Id=".$_POST['Id'];

if ($connect->query($query) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $connect->error;
}



?>