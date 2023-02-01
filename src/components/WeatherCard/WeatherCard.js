import "./WeatherCard.css";
import cloudyday from "../../images/cloudyday.svg"; // Delete later...

function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <h2 className="weather-card__temp">
        {/* Auto updates temp */}
        {Math.round(weatherData.temperature)}°F
      </h2>
      <div className="weather-card__wrapper">
        <img className="weather-card__image" src={cloudyday} alt="..." />
      </div>
    </div>
  );
}

export default WeatherCard;
