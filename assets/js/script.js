var cityInputEl = document.querySelector('#city-input');
var cityNameEl = document.querySelector('#city-name');
var searchBtnEl = document.querySelector('#search-btn');

var cityArr = [];
var formHandler = function(event) {
    // formats city name
    var city = cityInputEl.value;

    if (city) {
        getCurrentWeather(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter a city!');
    };

    
};

// uses 'current weather api' to fetch latitude and longitude
var getCurrentWeather = function(selectedCity) {
    var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=imperial&appid=cb4df67a69d2950ccf15e89555ac99d4`;

    fetch(currentWeatherApi).then(function(response) {
        response.json().then(function(data) {
            var longitude = data.coord['lon'];
            var lattitude = data.coord['lat'];

            console.log(longitude);
            getCityForecast(selectedCity, longitude, lattitude);

            // saves searched city and refreshes recent city list
            if (document.querySelector('.city-list')) {
                document.querySelector('.city-list').remove();
            }

            saveCity(selectedCity);
            savedCities();
            
        });

    })

}

// uses latitude and longitude to fetch current weather and five-day forecast
var getCityForecast = function(selectedCity, longitude, lattitude) {
    var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=cb4df67a69d2950ccf15e89555ac99d4`;
    fetch(oneCallApi).then(function(response) {
        response.json().then(function(data) {

            // identifies city name in forecast
            cityNameEl.textContent = `${selectedCity} (${moment().format("M/D/YYYY")})`;
            currentForecast(data);
            fiveDayForecast(data);
        });

    })
}

//  display rounded temperature
var displayTemp = function(element, temperature) {
    var tempEl = document.querySelector(element);
    var elementText = Math.round(temperature);
    tempEl.textContent = elementText;
}

// displays current forecast
var currentForecast = function(forecast) {

    var forecastEl = document.querySelector('.city-forecast');
    forecastEl.classList.remove('hide');

    var weatherIconEl = document.querySelector('#today-icon');
    var currentIcon = forecast.current.weather[0].icon;
    weatherIconEl.setAttribute('src', `http://openweathermap.org/img/wn/${currentIcon}.png`);
    weatherIconEl.setAttribute('alt', forecast.current.weather[0].main)



    displayTemp('#current-temp', forecast.current['temp']);
    displayTemp('#current-feels-like', forecast.current['feels_like']);
    displayTemp('#current-high', forecast.daily[0].temp.max);
    displayTemp('#current-low', forecast.daily[0].temp.min);

    var currentConditionEl = document.querySelector('#current-condition');
    currentConditionEl.textContent = forecast.current.weather[0].description;
    // .split(' ')
    // .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    // .join(' ');

    var currentHumidityEl = document.querySelector('#current-humidity');
    currentHumidityEl.textContent = forecast.current['humidity'];

    var currentWindEl = document.querySelector('#current-wind-speed')
    currentWindEl.textContent = forecast.current['wind_speed'];

    var uviEl = document.querySelector('#current-uvi')
    var currentUvi = forecast.current['uvi'];
    uviEl.textContent = currentUvi;

    // styles UV index
    switch (true) {
        case (currentUvi <= 2):
            uviEl.className = 'badge badge-success';
            break;
        case (currentUvi <= 5):
            uviEl.className = 'badge badge-warning';
            break;
        case (currentUvi <= 7):
            uviEl.className = 'badge badge-danger';
            break;
        default:
            uviEl.className = 'badge text-light';
            uviEl.setAttribute('style', 'background-color: #553C7B');
    }
}

// display five day forecast
var fiveDayForecast = function(forecast) {

    for (var i = 1; i < 6; i++) {
        var dateP = document.querySelector('#date-' + i);
        dateP.textContent = moment().add(i, 'days').format('M/D/YYYY');

        var iconImg = document.querySelector('#icon-' + i);
        var iconCode = forecast.daily[i].weather[0].icon;
        iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}.png`);
        iconImg.setAttribute('alt', forecast.daily[i].weather[0].main);

        displayTemp('#temp-' + i, forecast.daily[i].temp.day);
        displayTemp('#high-' + i, forecast.daily[i].temp.max);
        displayTemp('#low-' + i, forecast.daily[i].temp.min);

        var humiditySpan = document.querySelector('#humidity-' + i);
        humiditySpan.textContent = forecast.daily[i].humidity;
    }
}

// saves cities into local storage
var saveCity = function(selectedCity) {

    // prevents duplicate city from being saved and moves it to end of array
    for (var j = 0; j < cityArr.length; j++) {
        if (selectedCity === cityArr[j]) {
            console.log("savecity" + cityArr[j])
            cityArr.splice(j, 1);
        }
    }

    cityArr.push(selectedCity);
    localStorage.setItem('cities', JSON.stringify(cityArr));
}

// loads cities from local storage
var savedCities = function() {
    cityArr = JSON.parse(localStorage.getItem('cities'));

    if (!cityArr) {
        cityArr = [];
        return false;
    } else if (cityArr.length > 5) {
        // saves only the five most recent cities
        cityArr.shift();
    }

    var recentCities = document.querySelector('#recent-cities');
    var cityListUl = document.createElement('ul');
    cityListUl.className = 'list-group list-group-flush city-list';
    recentCities.appendChild(cityListUl);

    for (var i = 0; i < cityArr.length; i++) {
        var cityListItem = document.createElement('button');
        cityListItem.setAttribute('type', 'button');
        cityListItem.className = 'list-group-item';
        cityListItem.setAttribute('value', cityArr[i]);
        cityListItem.textContent = cityArr[i];
        cityListUl.prepend(cityListItem);
    }

    var cityList = document.querySelector('.city-list');
    cityList.addEventListener('click', selectRecent)
}

var selectRecent = function(event) {
    var clickedCity = event.target.getAttribute('value');

    getCoords(clickedCity);
}

savedCities();
searchBtnEl.addEventListener('click', formHandler)

// searches for city on ENTER key
cityInputEl.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {

        cityInputEl.click();
    }
});