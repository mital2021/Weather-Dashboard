

//search button ,input function

 $(document).ready(function () {

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
            
       
        if (history.indexOf(searchTerm) === -1) {
          
            history.push(searchTerm);
        
            localStorage.setItem("history", JSON.stringify(history));
            createRow(searchTerm);
        }

        $("#todayWeather").empty();

        var title = $("<h3>").addClass("title").text(response.name + " (" + new Date().toLocaleDateString() + ")");
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
  
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " K");
        console.log(response)
        var lon = response.coord.lon;
        var lat = response.coord.lat;



        

});
  }
     
  function weatherForecast(searchTerm){

}





});







