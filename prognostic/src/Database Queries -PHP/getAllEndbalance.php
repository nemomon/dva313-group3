<?php  
  
 session_start();
 include_once 'connect/dbh.inc.php'; // connect to database  

      $output = [];  // array
      $query = "SELECT * FROM `endbalanceview`";  
      $result = mysqli_query($connect, $query);
      //check if there are rows  
      if ($result->num_rows > 0) {
                //push all the rows in array
                while($row = mysqli_fetch_array($result))  
                {  
                  $output[] = array_push($output, array(
                   'Id' => $row['Id'],
                   'Name' => $row['Name'],
                   'ExternalSalary' => $row['ExternalSalary'],
                   'InternalSalary' => $row['InternalSalary'],
                   'ExternalOverhead' => $row['ExternalOverhead'],
				   'InternalOverhead' => $row['InternalOverhead'],
				   'ExternalOtherCost' => $row['ExternalOtherCost'],
                   'InternalOtherCost' => $row['InternalOtherCost'] ));
                  
                }  
                // set the array into json form
                echo json_encode($output);  
              }
              else{
                echo "0 results";
              }
             
        
 
 ?>