const urlBase = 'https://COP4331web.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";


function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
//	var hash = md5( password );

	if((login.length < 1) || (password.length < 1)) 
	{
		document.getElementById("loginResult").innerHTML = "Please fill in all fields.";
		return;
	}
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "Username or password is incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}


function doRegister()
{
	userId = -1;
	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
    let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
//	var hash = md5( password );

	if((firstName.length < 1) || (lastName.length < 1) || (login.length < 1) || (password.length < 1)) 
	{
		document.getElementById("regResult").innerHTML = "Please fill in all fields.";
		return;
	}

	let passLow = /[a-z]/g;
	let passUp = /[A-Z]/g;
	let passNum = /[0-9]/g;

	if((!password.match(passLow)) || (!password.match(passUp)) || (!password.match(passNum)) || (password.length < 8))
	{
		document.getElementById("regResult").innerHTML = "Password must be at least 8 characters long and <br> include at least one lowercase, uppercase, and digit";
		return;
	}

    document.getElementById("regResult").innerHTML = "";

    let tmp = {firstName:firstName,lastName:lastName,login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/Register.' + extension;
    
    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
    	xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse( xhr.responseText );

			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("regResult").innerHTML = jsonObject.error;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("regResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
		return false;
	}
	else
	{
		document.getElementById("contactHeader").innerHTML = "Logged in as " + firstName + " " + lastName;
		document.getElementById("invisible").innerHTML = "" + userId;
		return true;
	}
}

function readCookieAlt()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId > 0 )
	{
		window.location.href = "contacts.html";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	let newFirst = document.getElementById("contactFirst").value;
	let newLast = document.getElementById("contactLast").value;
	let newPhone = document.getElementById("contactPhone").value;
	let newEmail = document.getElementById("contactEmail").value;
	let userId = Number(document.getElementById("invisible").innerHTML);

	if((newFirst.length < 1) || (newLast.length < 1) || (newPhone.length < 1) || (newEmail.length < 1)) 
	{
		document.getElementById("contactAddResult").innerHTML = "Please fill in all fields.";
		return;
	}

	document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstName:newFirst,lastName:newLast,phone:newPhone,email:newEmail,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				document.getElementById("contactFirst").value = "";
				document.getElementById("contactLast").value = "";
				document.getElementById("contactPhone").value = "";
				document.getElementById("contactEmail").value = "";
				searchContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	let srch = document.getElementById("searchText").value;
	let userId = Number(document.getElementById("invisible").innerHTML);

	document.getElementById("contactList").innerHTML = "";

	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srch,userId:userId};

	if((srch.length < 1)) 
	{
		tmp = {search:"",userId:userId};
	}

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Search.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contacts retrieved";
				let jsonObject = JSON.parse( xhr.responseText );

				if( jsonObject.results.length < 1 )
				{		
					document.getElementById("contactSearchResult").innerHTML = "No Records Found";
					document.getElementById("contactList").innerHTML = "";
					return;
				}

				contactList += "<tr><th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Email Address</th></tr>";
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					let sId = JSON.stringify(jsonObject.results[i].id);
					let sFirst = JSON.stringify(jsonObject.results[i].firstName);
					let sLast = JSON.stringify(jsonObject.results[i].lastName);
					let sPhone = JSON.stringify(jsonObject.results[i].phone);
					let sEmail = JSON.stringify(jsonObject.results[i].email);

					let nsFirst = sFirst.replace('"','');
					let nsLast = sLast.replace('"','');
					let nsPhone = sPhone.replace('"','');
					let nsEmail = sEmail.replace('"','');
					nsFirst = nsFirst.replace('"','');
					nsLast = nsLast.replace('"','');
					nsPhone = nsPhone.replace('"','');
					nsEmail = nsEmail.replace('"','');

					contactList += `<tr><td>`+nsFirst+`</td><td>`+nsLast+`</td><td>`+nsPhone+`</td><td>`+nsEmail+`</td><td><button type='button' class='openUpdateWindow tableButtons' onclick='show();populateUpdate(`+sId+`,`+sFirst+`,`+sLast+`,`+sPhone+`,`+sEmail+`);'>Edit</button></td><td><button type='button' class='tableButtons' onclick='deleteContact(`+sId+`);'>Delete</button></td></tr>`;
				}
				
				document.getElementById("contactList").innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function show()
{
	var modal = document.getElementById("modalUpdateDiv");
    modal.style.display = "block";
}

function hide()
{
	var modal = document.getElementById("modalUpdateDiv");
    modal.style.display = "none";
    document.getElementById("contactUpdateResult").innerHTML = "";
}

function populateUpdate(contactId,eFirst,eLast,ePhone,eEmail) 
{
	document.getElementById("contactUpdateFirst").value = eFirst;
	document.getElementById("contactUpdateLast").value = eLast;
	document.getElementById("contactUpdatePhone").value = ePhone;
	document.getElementById("contactUpdateEmail").value = eEmail;
	document.getElementById("hidden").innerHTML = contactId;
}

function editContact() 
{
	let contactId = Number(document.getElementById("hidden").innerHTML);
	let userId = Number(document.getElementById("invisible").innerHTML);
	let eFirst = document.getElementById("contactUpdateFirst").value;
	let eLast = document.getElementById("contactUpdateLast").value;
	let ePhone = document.getElementById("contactUpdatePhone").value;
	let eEmail = document.getElementById("contactUpdateEmail").value;

	if((eFirst.length < 1) || (eLast.length < 1) || (ePhone.length < 1) || (eEmail.length < 1)) 
	{
		document.getElementById("contactUpdateResult").innerHTML = "Please fill in all fields.";
		return;
	}

	let tmp = {firstName:eFirst,lastName:eLast,phone:ePhone,email:eEmail,id:contactId,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Update.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "";
				hide();
				searchContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function deleteContact(contactId) 
{
    contactId = Number(contactId);
	let userId = Number(document.getElementById("invisible").innerHTML);

	if(confirm("Are you sure you want to delete this contact?") != true)
	{
		return;
	}

	let tmp = {id:contactId,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Delete.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				searchContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}
