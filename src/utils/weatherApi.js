const getWeather = (latitude, longitude, key) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

const setDataFromWeatherApi = (data) => {
  // if no data is found = return null
  if (!data) {
    return null;
  }
  // Weather will return properties:
  const weather = {};
  weather.city = data.name;
  weather.condition = data.weather.main;
  weather.temperature = data.main.temp;

  return weather;
};

export { getWeather, setDataFromWeatherApi };