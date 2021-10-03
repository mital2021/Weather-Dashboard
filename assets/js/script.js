

//search button ,input funtion
function myFunction(){

$("#searchButton").on("click", function () {
var searchTerm = $("#searchValue").val();
$("#search-value").val("");
weatherFunction(searchTerm);
weatherForecast(searchTerm);
});

$("#searchButton").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13) {
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    }
  });





}







