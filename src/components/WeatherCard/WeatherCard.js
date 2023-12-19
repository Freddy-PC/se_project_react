import "./WeatherCard.css";
import { weatherForecast } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  // Access data from Context
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // Return nothing if no weatherData
  if (!weatherData) return null;

  console.log(weatherData);

  // Make a variable from API value to pass as a value
  const currentForecastName = weatherData.forecast;

  ///////////////////////////////////////////////////
  // // Logic if it's day based on unix time values
  // const dayTime = weatherData.unixTime < weatherData.sunset;

  /* Find the same weather value from the array of objects 
     and the forecast (API) array */
  const currentWeather = weatherForecast.find(
    (item) => item.name === currentForecastName
  );

  /* If the weather value in the array of objects is found
     get the image path from the array of objects */
  const weatherImagePath = currentWeather ? currentWeather.image : null;

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
          alt="weather icon"
        />
      </div>
    </div>
  );
}

export default WeatherCard;
