<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



$query = "UPDATE Project SET  Name = '".$_POST['Name']."', EndDate= '".$_POST['EndDate']."', Stl = ".$_POST['Stl']." ,ExternalSalary = ".$_POST['ExternalSalary'].", ExternalOverhead = ".$_POST['ExternalOverhead'].",ExternalOtherCost = ".$_POST['ExternalOtherCost']." , InternalSalary = ".$_POST['InternalSalary'].", InternalOverhead = ".$_POST['InternalOverhead'].", InternalOtherCost = ".$_POST['InternalOtherCost'].", SpendingExternalSalary = ".$_POST['SpendingExternalSalary'].", SpendingExternalOverhead = ".$_POST['SpendingExternalOverhead'].", SpendingExternalOtherCost = ".$_POST['SpendingExternalOtherCost'].", SpendingInternalSalary= ".$_POST['SpendingInternalSalary'].", SpendingInternalOverhead = ".$_POST['SpendingInternalOverhead'].", SpendingInternalOtherCost = ".$_POST['SpendingInternalOtherCost'].", SpendingDate = '".$_POST['SpendingDate']."', OverheadConstant = ".$_POST['OverheadConstant']." WHERE Id=".$_POST['Id'];

if ($connect->query($query) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $connect->error;
}



?>