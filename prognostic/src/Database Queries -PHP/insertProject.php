<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



 $query = "INSERT INTO Allocation ( Name, EndDate, Stl, ExternalOverhead,ExternalOtherCost , InternalSalary, InternalOverhead, InternalOtherCost, SpendingExternalSalary, SpendingExternalOverhead, SpendingExternalOtherCost, SpendingInternalSalary, SpendingInternalOverhead, SpendingInternalOtherCost, SpendingDate, OverheadConstant, ExternalSalary)
VALUES ('".$_POST['Name']."', '".$_POST['EndDate']."', ".$_POST['Stl'].", ".$_POST['ExternalOverhead'].",  ".$_POST['ExternalOtherCost'].",  ".$_POST['InternalSalary'].",  ".$_POST['InternalOverhead'].",  ".$_POST['InternalOtherCost'].",  ".$_POST['SpendingExternalSalary'].",  ".$_POST['SpendingExternalOverhead'].",  ".$_POST['SpendingExternalOtherCost'].",  ".$_POST['SpendingInternalSalary'].",  ".$_POST['SpendingInternalOverhead'].",  ".$_POST['SpendingInternalOtherCost'].",  '".$_POST['SpendingDate']."',  ".$_POST['OverheadConstant'].",  ".$_POST['ExternalSalary'].")";

if ($connect->query($query) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $query . "<br>" . $connect->error;
}



?>