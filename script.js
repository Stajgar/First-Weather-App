function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Otcober",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();

  let currentHours = date.getHours();

  let currentMinutes = date.getMinutes();

  let newDate = `${currentDay}, ${currentDate} ${currentMonth}, ${currentHours}:${currentMinutes}`;

  return newDate;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${formatDate(new Date())}`;

// SEARCH CITY, SHOW CITY INFO - NAME, TEMP, DESCRIPTION

function displayCityInfo(response) {
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#cloudiness"
  ).innerHTML = `Cloudiness: ${response.data.clouds.all}%`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city-input");
  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = `${input.value}`;
  search(input.value);
}

function search(city) {
  let apiKey = "922c46ab82d8163152e55bf43505a833";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityInfo);
}

let searchText = document.querySelector("#search-form");
searchText.addEventListener("submit", searchCity);

function currentInfo(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#cloudiness"
  ).innerHTML = `Cloudiness: ${response.data.clouds.all}%`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "922c46ab82d8163152e55bf43505a833";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentInfo);
}

navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector(".current-location-button");

button.addEventListener("click", showPosition);
