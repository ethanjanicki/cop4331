var modal = document.getElementById("modalDiv");

var btn = document.getElementById("openWindow");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function()
{
    modal.style.display = "block";
}

span.onclick = function()
{
    modal.style.display = "none";
    document.getElementById("contactAddResult").innerHTML = "";
}

window.onclick = function(event) 
{
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("contactAddResult").innerHTML = "";
    }
}