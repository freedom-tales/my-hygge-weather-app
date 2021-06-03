//display current date

function currentDate(){  
  let currentDate = new Date();
  let weekDays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];
  let currentWeekDay = weekDays[currentDate.getDay()];
  let currentHours = ('0'+currentDate.getUTCHours()).slice(-2);
  let currentMinutes = ('0'+currentDate.getUTCMinutes()).slice(-2);
  return (`${currentWeekDay} ${currentHours}:${currentMinutes}`);
}

let presentDate = document.querySelector("#current-date");
presentDate.innerHTML = currentDate();

//display searchedCity & cityTemperature & cityWeatherDescription with API

function searchCity(event){
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city");
  let searchResult = searchCityInput.value;
  searchResult=searchResult.trim().toUpperCase();
  
  let cityName=document.querySelector("#search-city-output");
  cityName.innerHTML=searchResult;

  search(searchResult);
}

function search(city){
  let apiKey ="c3b5b86464d7fae06b475e856feb3c14";
  let units="metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
search("Zurich");

function displayWeather(response) {
  let temperature=response.data.main.temp;
  let temperatureCelsius = Math.round(response.data.main.temp);
  let weatherDescription=(response.data.weather[0].description).toUpperCase();
  let weatherIcon=response.data.weather[0].icon;
  let windSpeed=Math.round(response.data.wind.speed);
  let humidity=response.data.main.humidity;
  let mainDescription=response.data.weather[0].main.toLowerCase();
      
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperatureCelsius;
  
  let currentWeather = document.querySelector("#weather-description");
  currentWeather.innerHTML = weatherDescription;

  let currentWeatherIcon=document.querySelector("#currentWeather-icon");
  currentWeatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);

  let currentWindSpeed=document.querySelector("#wind");
  currentWindSpeed.innerHTML=windSpeed;

  let currentHumidity=document.querySelector("#humidity");
  currentHumidity.innerHTML=humidity;

  let currentWeatherImage=document.querySelector("#background-image");
  currentWeatherImage.setAttribute("src",`images/${mainDescription}.png`);

  let coordinates=response.data.coord;
  let latitude=response.data.coord.lat;
  let longitude=response.data.coord.lon;  
  getForecast(coordinates);
}

//display weather forecast for 5 days

function ForecastDate(timestamp){
  let date=new Date(timestamp*1000);
  let forecastDay=date.getDay();
  let weekDay = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];
  return weekDay[forecastDay];
  }
  
  function displayForecast(response){
    let forecast=response.data.daily;
    let weatherForecastElement=document.querySelector("#weather-forecast");
    let weatherForecastHTML =`<div class="row">`;
    forecast.forEach(function(forecastDay,index){
      if (index<1){
        weatherForecastHTML =weatherForecastHTML+`
        <div class="col-2">
          <div class="weather-forecast-date"> TODAY </div>
          <div class="weather-forecast-temp"><span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}&deg;</span>|<span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}&deg;</span></div>
          <div class="weather-forecast-icon"><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="48" /></div>
        </div>`;
      } else{
          if(index<6){
            weatherForecastHTML =weatherForecastHTML+`
            <div class="col-2">
            <div class="weather-forecast-date"> ${ForecastDate(forecastDay.dt)} </div>
            <div class="weather-forecast-temp"><span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}&deg;</span>|<span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}&deg;</span></div>
            <div class="weather-forecast-icon"><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="48" /></div>
            </div>`;
          }
        }
      });
    weatherForecastHTML=weatherForecastHTML + `</div>`;
    weatherForecastElement.innerHTML=weatherForecastHTML;
  }

  function getForecast(coordinates){
    let apiKey = "c3b5b86464d7fae06b475e856feb3c14";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
    }
  
let searchInput =document.querySelector("#search-form");
searchInput.addEventListener("submit", searchCity);

//display location&weather with GPS coordinates

function displayWeatherLocation(response) {
  let currentLocation=response.data.name.toUpperCase();
  let currentTemperature = Math.round(response.data.main.temp);
  let weatherDescription=(response.data.weather[0].description).toUpperCase();
    
  let gpsCity=document.querySelector("#search-city-output");
  gpsCity.innerHTML=currentLocation;
    
  let gpsTemperature = document.querySelector("#current-temperature");
  gpsTemperature.innerHTML = currentTemperature;

  let gpsWeather = document.querySelector("#weather-description");
  gpsWeather.innerHTML = weatherDescription;  
}

function getCurrentPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//display weather forecast with GPS for 5 days

function gpsForecastDate(timestamp){
  let date=new Date(timestamp*1000);
  let forecastDay=date.getDay();
  let weekDay = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];
  return weekDay[forecastDay];
  }

function displayGpsForecast(response) {
  let forecast = response.data.daily;
  let weatherGpsForecastElement = document.querySelector("#weather-forecast");
  let weatherGpsForecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 1) {
      weatherGpsForecastHTML =
        weatherGpsForecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date"> TODAY </div>
          <div class="weather-forecast-temp"><span class="weather-forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}&deg;</span>|<span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}&deg;</span></div>
          <div class="weather-forecast-icon"><img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width="48" /></div>
        </div>`;
    } else {
      if (index < 6) {
        weatherGpsForecastHTML =
          weatherGpsForecastHTML +
          `
            <div class="col-2">
            <div class="weather-forecast-date"> ${ForecastDate(
              forecastDay.dt
            )} </div>
            <div class="weather-forecast-temp"><span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}&deg;</span>|<span class="weather-forecast-temp-min">${Math.round(
            forecastDay.temp.min
          )}&deg;</span></div>
            <div class="weather-forecast-icon"><img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="48" /></div>
            </div>`;
      }
    }
  });
  weatherGpsForecastHTML = weatherGpsForecastHTML + `</div>`;
  weatherGpsForecastElement.innerHTML = weatherGpsForecastHTML;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  let apiKey = "c3b5b86464d7fae06b475e856feb3c14";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  let apiUrlForecast=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayWeatherLocation);
  axios.get(apiUrlForecast).then(displayGpsForecast);
}

let gpsButton = document.querySelector("#search-GPS-coordinates");
gpsButton.addEventListener('click', getCurrentPosition);







  