//display current date

function currentDate(){  
  let currentDate = new Date();
  let weekDays = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
  ];
  let currentWeekDay = weekDays[currentDate.getDay()];
  let currentHours = ('0'+currentDate.getUTCHours()).slice(-2);
  let currentMinutes = ('0'+currentDate.getUTCMinutes()).slice(-2);
  return (`${currentWeekDay} ${currentHours}:${currentMinutes}`);
}

let presentDate = document.querySelector("#current-date");
presentDate.innerHTML = currentDate();



//display searchedCity&cityTemperature&cityWeatherDescription with API

function searchCity(event){
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city");
  let searchResult = searchCityInput.value;
  searchResult=searchResult.trim().toUpperCase();
  
  let cityName=document.querySelector("#search-city-output");
  cityName.innerHTML=searchResult;
  
  let apiKey ="c3b5b86464d7fae06b475e856feb3c14";
  let units="metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchResult}&appid=${apiKey}&units=${units}`;

  function displayWeather(response) {
    let temperature=response.data.main.temp;
    let temperatureCelsius = Math.round(response.data.main.temp);
    let weatherDescription=(response.data.weather[0].description).toUpperCase();
        
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperatureCelsius;
  
    let currentWeather = document.querySelector("#weather-description");
    currentWeather.innerHTML = weatherDescription;

    //convert celsius <=> fahrenheit 
    
    function convertToF(){
      currentTemperature.innerHTML = Math.round(temperature*9/5+32);
    }
    let fahrenheitLink = document.querySelector("#fahrenheit-icon");
    fahrenheitLink.addEventListener("click", convertToF);
    
    function convertToC(){
      currentTemperature.innerHTML = temperatureCelsius;
    }
    let celsiusLink = document.querySelector("#celsius-icon");
    celsiusLink.addEventListener("click", convertToC);
  }
  
  axios.get(apiUrl).then(displayWeather);
}

let searchInput =document.querySelector("#search-form");
searchInput.addEventListener("submit", searchCity);

//Display location&weather with GPS coordinates

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  let apiKey = "c3b5b86464d7fae06b475e856feb3c14";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  function displayWeatherLocation(response) {
    let currentLocation=response.data.name;
    let currentTemperature = Math.round(response.data.main.temp);
    let weatherDescription=(response.data.weather[0].description).toUpperCase();
    
    let gpsCity=document.querySelector("#search-city-output");
    gpsCity.innerHTML=currentLocation;
    
    let gpsTemperature = document.querySelector("#current-temperature");
    gpsTemperature.innerHTML = currentTemperature;

    let gpsWeather = document.querySelector("#weather-description");
    gpsWeather.innerHTML = weatherDescription;

    //convert celsius <=> fahrenheit 
    
    function convertToF(){
      gpsTemperature.innerHTML = Math.round(currentTemperature*9/5+32);
    }
    let fahrenheitLink = document.querySelector("#fahrenheit-icon");
    fahrenheitLink.addEventListener("click", convertToF);
    
    function convertToC(){
      gpsTemperature.innerHTML = currentTemperature;
    }
    let celsiusLink = document.querySelector("#celsius-icon");
    celsiusLink.addEventListener("click", convertToC);    
  }

  axios.get(apiUrl).then(displayWeatherLocation);
}
function getCurrentPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let gpsButton = document.querySelector("#search-GPS-coordinates");
gpsButton.addEventListener('click', getCurrentPosition);