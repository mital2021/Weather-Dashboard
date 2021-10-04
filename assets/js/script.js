
//search button feature
$(document).ready(function () {
    
    $("#searchButton").on("click", function () {
      
      var searchTerm = $("#searchValue").val();

      $("#searchValue").val("");
      currentWeather(searchTerm);
      currentForecast(searchTerm);
    });

  //local storage
      var getHistory = JSON.parse(localStorage.getItem("getHistory")) || [];
      
      for (var i = 0; i < getHistory.length; i++) {
      createRow(getHistory[i]);
    }
    function createRow(text) {
      var listItem = $("<li>").addClass("list-group-item").text(text);
      $(".getHistory").append(listItem);
     
    }
  
    $(".getHistory").on("click", "li", function () {
      currentWeather($(this).text());
      currentForecast($(this).text());
    });
  
 //fetch current weather info
    function currentWeather (searchTerm) {
  
      fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=cb4df67a69d2950ccf15e89555ac99d4"
  
      )
      .then(function (data) {
        
        if (getHistory.indexOf(searchTerm) === -1) {
         
          getHistory.push(searchTerm);
        
          localStorage.setItem("getHistory", JSON.stringify(getHistory));
          createRow(searchTerm);
        }
       
        $("#today").empty();
  
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var wind = $("<p>").addClass("card-text").text("Wind:" + data.wind + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.humid + " %");
        var temp = $("<p>").addClass("card-text").text("Temp: " + data.temp + " F");
     console.log(data);

      }); 
  
  };

});
