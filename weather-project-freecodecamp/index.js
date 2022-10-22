let locationText = document.querySelector(".location-text");
let temperatureText = document.querySelector(".temperature-text");
let skyWeatherText = document.querySelector(".sky-weather-text");
let spinningWeatherIcon = document.getElementById("spinning-weather-icon");
let tempTextLink = document.querySelector(".temp-text-link");
let weatherIconDiv = document.querySelector(".weather-icon-div");
let weatherImg = document.createElement("img");
weatherImg.setAttribute("id", "spinning-weather-icon");
weatherImg.setAttribute("alt", "spinning weather icon");
let celsiusTemp;
let fahrenheitTemp;

//returns if geo api call succeeds
const showPosition = (position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getWeather(lat, long);
};

//returns if geo api call fails
const errorCallback = (error) => {
  console.error(error);
};

//geolocation api call is made
navigator.geolocation.getCurrentPosition(showPosition, errorCallback);

//weather api call that only executes if geo api call succeeds
const getWeather = (lat, long) => {
  fetch(
    `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`
  )
    .then((response) => response.json())
    .then((data) => {
      tempTextLink.innerHTML = "C";
      weatherImg.src = data.weather[0].icon;
      weatherIconDiv.appendChild(weatherImg);
      locationText.innerHTML = data.name + ", " + data.sys.country;
      temperatureText.innerHTML = Math.round(data.main.temp) + " °";
      temperatureText.appendChild(tempTextLink);
      skyWeatherText.innerHTML = data.weather[0].main;
      celsiusTemp = temperatureText.innerHTML.match(/[0-9]/g).join("");
      fahrenheitTemp = (Number(celsiusTemp) * 9/5) + 32;
    });
};


tempTextLink.addEventListener("click", function () {
  if (tempTextLink.innerHTML === "C") {
    tempTextLink.innerHTML = "F";
    temperatureText.innerHTML = Math.round(fahrenheitTemp) + " °";
    temperatureText.appendChild(tempTextLink);
  } else {
    tempTextLink.innerHTML = "C";
    temperatureText.innerHTML = celsiusTemp + " °";
    temperatureText.appendChild(tempTextLink);
  }
});
