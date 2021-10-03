

//search button ,input function
function myFunction(){

$("#searchButton").on("click", function () {
var searchTerm = $("#searchValue").val();
$("#search-value").val("");
weatherFunction(searchTerm);
weatherForecast(searchTerm);
});

  var history = JSON.parse(localStorage.getItem("history")) || [];













}







