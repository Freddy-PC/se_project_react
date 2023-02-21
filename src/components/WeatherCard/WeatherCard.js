import "./WeatherCard.css";
import cloudyday from "../../images/cloudyday.svg"; // Delete later...
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  // Access data from Context
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // Return nothing if no weatherData
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      <h2 className="weather-card__temp">
        {/* Auto updates temp */}
        {currentTemperatureUnit === "F"
          ? weatherData.temperatureF
          : weatherData.temperatureC}
      </h2>
      <div className="weather-card__wrapper">
        <img className="weather-card__image" src={cloudyday} alt="..." />
      </div>
    </div>
  );
}

export default WeatherCard;
