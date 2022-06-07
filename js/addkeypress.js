var input1 = document.getElementById("contactFirst");
var input2 = document.getElementById("contactLast");
var input3 = document.getElementById("contactPhone");
var input4 = document.getElementById("contactEmail");

input1.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
}
});

input2.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
}
});

input3.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
}
});

input4.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
}
});