<?php  

session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



$query = "UPDATE Person SET  Name = '".$_POST['Name']."', Salary= '".$_POST['Salary']."', SocialFactor = ".$_POST['SocialFactor']." ,IncrementFactor = ".$_POST['IncrementFactor']." WHERE Id=".$_POST['Id'];

if ($connect->query($query) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $connect->error;
}



?>