let now = new Date();
let h2 = document.querySelector("date");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
date.innerHTML = `Today is ${day} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#pontypool").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#press").innerHTML = `${Math.round(
    response.data.main.pressure
  )} hPa`;

  document.querySelector(
    "#humi"
  ).innerHTML = `${response.data.main.humidity} %`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#windd").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function entercity(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  entercity(city);
}

function searchLocation(position) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-temp-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

entercity("");
