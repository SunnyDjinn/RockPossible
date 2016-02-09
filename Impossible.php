<?php

session_start();
include('./Impossible.html');

$host = "localhost";
$user = "root";
$password = "";
$database = "Impossible";

$connection = mysqli_connect($host, $user, $password, $database);
if(mysqli_connect_errno($connection))
	echo "Cannot connect";
	
if (!$connection) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}


$result = mysqli_query($connection, "SELECT * FROM HallOfFame");
if($result == false)
	echo "<br/>failure retrieving data <br/>";

$_SESSION['HallOfFame'] = array();
$i = 0;
while($row = mysqli_fetch_array($result)) {
	$_SESSION['HallOfFame'][$i] = $row;
	$i++;
}

mysqli_close($connection);

?>
