

//search button ,input funtion
function myFunction(){

$("#searchButton").on("click", function () {
var searchTerm = $("#searchValue").val();
$("#search-value").val("");
weatherFunction(searchTerm);
weatherForecast(searchTerm);
});







}







