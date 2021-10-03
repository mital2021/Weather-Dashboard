

//search button ,input function
function myFunction(){

$("#searchButton").on("click", function () {
var searchTerm = $("#searchValue").val();
$("#searchValue").val("");
 weatherFunction(searchTerm);
 weatherForecast(searchTerm);
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

  function weatherFunction(searchTerm){
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=cb4df67a69d2950ccf15e89555ac99d4"
        )
        .then(function(response){
            return response.json()
        })

        .then(function(response) {
            console.log(response.data[0]);
  });
  }





}







