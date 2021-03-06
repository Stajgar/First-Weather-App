// Time and Date

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateDay = date.getDate();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];

  return `${day} ${dateDay} ${month} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Weather icons changer

let iconCodePathConverter = {
  "01d": "img/clearskyday.svg",
  "01n": "img/clearskynight.svg",
  "02d": "img/fewcloudsday.svg",
  "02n": "img/fewcloudsnight.svg",
  "03d": "img/scatteredcloudsday.svg",
  "03n": "img/scatteredcloudsnight.svg",
  "04d": "img/brokencloudsday.svg",
  "04n": "img/brokencloudsnight.svg",
  "09d": "img/showerrain.svg",
  "09n": "img/showerrain.svg",
  "10d": "img/rainday.svg",
  "10n": "img/rainnight.svg",
  "11d": "img/thunderstormday.svg",
  "11n": "img/thunderstormnight.svg",
  "13d": "img/snowday.svg",
  "13n": "img/snownight.svg",
  "50d": "img/mistday.svg",
  "50n": "img/mistnight.svg",
}

// Temperature, Humidity, Wind info display

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#city-temp");
  let descriptionElement = document.querySelector("#weather-description");
  let popElement = document.querySelector("#pop");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
;
  celsiusTemperature = response.data.list[0].main.temp;

  cityElement.innerHTML = response.data.city.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.list[0].weather[0].description;
  popElement.innerHTML = Math.round(response.data.list[0].pop);
  humidityElement.innerHTML = response.data.list[0].main.humidity;
  windElement.innerHTML = Math.round(response.data.list[0].wind.speed);
  dateElement.innerHTML = formatDate(Date.now());

  iconElement.setAttribute("src", iconCodePathConverter[response.data.list[0].weather[0].icon]);
  iconElement.setAttribute("alt", response.data.list[0].weather[0].description);
}

// Forecast display

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
    <h3>
    ${formatHours(forecast.dt * 1000)}
    </h3>
      <img src="${iconCodePathConverter[forecast.weather[0].icon]}" alt="icon" />
      <div class="weather-forecast-temperature temperature">
      <strong>${Math.round(forecast.main.temp_max)}°
      </strong> ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
    `;
    } 
  }

  // City search engine

function search(city) {
  let apiKey = "922c46ab82d8163152e55bf43505a833";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector(".type-city-input");
  search(cityInputElement.value);
}

// User Geolocation
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "922c46ab82d8163152e55bf43505a833";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
  apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Celsius vs Fahrenheit conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#city-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener("click", findPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Warsaw");

