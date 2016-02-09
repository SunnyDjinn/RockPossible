<?php
	
session_start();

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


/* Retrieving results */
$result = mysqli_query($connection, "SELECT * FROM HallOfFame");
if(!$result) {
	echo "<br/>Failure retrieving data <br/>";
	exit;
}

/* Close connection */
mysqli_close($connection);

/* Format and send data */
$topScores = array();
$i = 0;

while($row = mysqli_fetch_array($result)) {
	$topScores[$i]['name'] = $row['username'];
	$topScores[$i]['level'] = $row['level'];
	$topScores[$i]['score'] = $row['score'];
	$i++;
}

echo json_encode($topScores);

?>
