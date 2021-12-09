<?php
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 1;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 2;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 3;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 4;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 5;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 6;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 7;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 8;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 9;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 10;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 11;
// SELECT COUNT (locationID) FROM personnel WHERE locationID = 12;
	// example use from browser
	// http://localhost/companydirectory/libs/php/getAllDepartments.php

	// remove next two lines for production	
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	// SQL does not accept parameters and so is not prepared

	$query = 'SELECT id, name FROM location'; 
  
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 1;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 2;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 3;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 4;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 5;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 6;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 7;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 8;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 9;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 10;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 11;';
  // $query .= 'SELECT COUNT (locationID) FROM personnel WHERE locationID = 12;';
  
	$result = $conn->query($query);

	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>