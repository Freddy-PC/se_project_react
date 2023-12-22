import "./WeatherCard.css";
import { weatherForecast } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  // Access data from Context
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // Return nothing if no weatherData
  if (!weatherData) return null;

  // Make a variable from API value to pass as a value
  const currentForecastName = weatherData.forecast;

  const isNight = weatherData.unixTime > weatherData.sunset;

  const currentWeather = weatherForecast.find((item) =>
    Array.isArray(item.name)
      ? item.name.includes(currentForecastName)
      : item.name === currentForecastName
  );

  const weatherImagePath = currentWeather
    ? isNight
      ? currentWeather.imageNight
      : currentWeather.imageDay
    : null;

  return (
    <div className="weather-card">
      <h2 className="weather-card__temp">
        {/* Auto updates temp */}
        {currentTemperatureUnit === "F"
          ? weatherData.temperatureF
          : weatherData.temperatureC}
      </h2>
      <div className="weather-card__wrapper">
        <img
          className="weather-card__image"
          src={weatherImagePath}
          alt="Error: WeatherIcon Here!"
        />
      </div>
    </div>
  );
}

export default WeatherCard;
