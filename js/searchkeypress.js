var input = document.getElementById("searchText");

input.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
}
});