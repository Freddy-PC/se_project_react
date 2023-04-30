import { processServerResponse } from "../utils/api";

const getWeather = async (latitude, longitude, key) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`
  );
  return processServerResponse(res);
};

const setDataFromWeatherApi = (data) => {
  // if no data is found = return null
  if (!data) {
    return null;
  }
  // Weather will return properties set equal to server properties:
  const weather = {};
  weather.city = data.name;
  weather.condition = data.weather.main;
  weather.temperature = data.main.temp;
  weather.temperatureF = `${Math.round(data.main.temp)}°F`;
  weather.temperatureC = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;

  return weather;
};

export { getWeather, setDataFromWeatherApi };
