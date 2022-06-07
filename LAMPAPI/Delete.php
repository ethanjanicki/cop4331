<?php
	$inData = getRequestInfo();
	
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
        $stmt = $conn->prepare("DELETE from Contacts WHERE ID=? AND UserID=?");
		$stmt->bind_param("ii", $id, $userId);
		$stmt->execute();
		returnWithError("Successfully Deleted Contact");
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