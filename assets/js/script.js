

//search button ,input function
function myFunction(){

$("#searchButton").on("click", function () {
var searchTerm = $("#searchValue").val();
$("#searchValue").val("");
 weatherFunction=(searchTerm);
 weatherForecast=(searchTerm);
});


//local storage, make row to list searched cities
  var history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length > 0) {
    weatherFunction(history[history.length - 1]);
  }

  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }

  function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
  }

  $(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
  });




  



}







