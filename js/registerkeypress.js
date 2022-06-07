var input1 = document.getElementById("firstName");
var input2 = document.getElementById("lastName");
var input3 = document.getElementById("username");
var input4 = document.getElementById("password");

input1.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("regBtn").click();
}
});

input2.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("regBtn").click();
}
});

input3.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("regBtn").click();
}
});

input4.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("regBtn").click();
}
});