<?php

session_start();

/* Getting contents from JSON string sent */
$result = file_get_contents('php://input');

/* Decoding the JSON object in a php array */
$result = json_decode($result, true);


/* Connection to database */
$host = "localhost";
$user = "root";
$password = "";
$database = "Impossible";

$connection = mysqli_connect($host, $user, $password, $database);
	
if (!$connection) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}


/* Deleting previous entries to override with new ones */
$sql = mysqli_query($connection, "DELETE FROM HallOfFame");
if (!$sql) {
    echo "Error: Unable to delete from Database." . PHP_EOL;
    echo "Debugging errno: " . mysqli_errno($connection)  . PHP_EOL;
    echo "Debugging error: " . mysqli_error($connection)  . PHP_EOL;
    exit;
}

/* Inserting new data in DB */
$i = 1;
foreach($result as $value){
	$sql = "INSERT INTO HallOfFame (rank, username, level, score) VALUES(" . $i . ", '" . $value['name'] ."', " . $value['level'] . ", " . $value['score']. ")";
	$sql = mysqli_query($connection, $sql);
	$i++;
	if (!$sql) {
		echo "Error: Unable to insert into Database." . PHP_EOL;
		echo "Debugging errno: " . mysqli_errno($connection)  . PHP_EOL;
		echo "Debugging error: " . mysqli_error($connection)  . PHP_EOL;
		exit;
	}
}

/* Closing connection */
mysqli_close($connection);


?>
