<?php  
 //fetch.php  
session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  



 $query = "UPDATE INTO Project ( Name, EndDate, Stl,ExternalSalary, ExternalOverhead,ExternalOtherCost , InternalSalary, InternalOverhead, InternalOtherCost, SpendingExternalSalary, SpendingExternalOverhead, SpendingExternalOtherCost, SpendingInternalSalary, SpendingInternalOverhead, SpendingInternalOtherCost, SpendingDate, OverheadConstant)
VALUES ('".$_POST['Name']."', '".$_POST['EndDate']."', ".$_POST['Stl'].",  ".$_POST['ExternalSalary'].", ".$_POST['ExternalOverhead'].",  ".$_POST['ExternalOtherCost'].",  ".$_POST['InternalSalary'].",  ".$_POST['InternalOverhead'].",  ".$_POST['InternalOtherCost'].",  ".$_POST['SpendingExternalSalary'].",  ".$_POST['SpendingExternalOverhead'].",  ".$_POST['SpendingExternalOtherCost'].",  ".$_POST['SpendingInternalSalary'].",  ".$_POST['SpendingInternalOverhead'].",  ".$_POST['SpendingInternalOtherCost'].",  '".$_POST['SpendingDate']."',  ".$_POST['OverheadConstant'].")";

if ($connect->query($query) === TRUE) {
    $last_id = $connect->insert_id;
    echo $last_id;
} else {
    echo "Error: " . $query . "<br>" . $connect->error;
}



?>