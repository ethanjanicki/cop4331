var input1 = document.getElementById("username");
var input2 = document.getElementById("password");

input1.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("loginBtn").click();
}
});

input2.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("loginBtn").click();
}
});