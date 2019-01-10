<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  


 $query = "Delete From Person Where Id = " . $_POST['Id']; 

 if ($connect->query($query) === TRUE) {
  echo "Record deleted successfully";
} else {
  echo "Error deleting record: " . $connect->error;
}







?>