const inputCity = document.getElementById("input-city");
const searchBtn = document.getElementById("search-btn");

const getWeatherInfo = async (cityName) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=d49fe10401ab4d98a6181554232609&q=${cityName}&aqi=yes`
    );
    if (response.ok) {
      return await response.json();
    } else {
      console.log("Enter Correct City Name");
    }
  } catch (error) {
    console.log(error);
  }
};

searchBtn.addEventListener("click", async () => {
  const cityName = inputCity.value;
  const cityNameElement = document.getElementById("city-name");
  const dateElement = document.getElementById("city-date");
  const timeElement = document.getElementById("city-time");
  const tempCElement = document.getElementById("city-temp-c");
  const tempFElement = document.getElementById("city-temp-f");
  const humidityElement = document.getElementById("city-humidity");
  const windKphElement = document.getElementById("city-wind-kph");

  const weatherData = await getWeatherInfo(cityName);

  // Convert time to 24-hour format
  const localTime = new Date(weatherData.location.localtime);
  const formattedTime = localTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  cityNameElement.innerText = `${weatherData.location.country}, ${weatherData.location.region}, ${weatherData.location.name}`;
  dateElement.innerText = `Date: ${localTime.toDateString()}`;
  timeElement.innerText = `Time: ${formattedTime}`;
  tempCElement.innerText = `Temperature (°C): ${weatherData.current.temp_c}`;
  tempFElement.innerText = `Temperature (°F): ${weatherData.current.temp_f}`;
  humidityElement.innerText = `Humidity: ${weatherData.current.humidity}`;
  windKphElement.innerText = `Wind Speed: ${weatherData.current.wind_kph} K/h`;
});
