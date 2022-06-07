<?php
	$inData = getRequestInfo();
	
    $firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
    $id = $inData["id"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $stmt1 = $conn->prepare("SELECT 1 from Contacts WHERE ID=? AND UserID=?");
        $stmt1->bind_param("ii", $id, $userId);
        $stmt1->execute();
        $result = $stmt1->get_result();

        while($row = $result->fetch_assoc())
		{
			$searchCount++;
		}

        if( $searchCount == 0 )
		{
			returnWithError( "No Matching Record Found" );
		}
        
        else
        {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=? AND UserID=?");
		$stmt->bind_param("ssssii", $firstName, $lastName, $phone, $email, $id, $userId);
		$stmt->execute();
		returnWithError("Updated Contact");
        }

        $stmt1->close();
        $stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>