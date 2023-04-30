import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// cardClick = when image clicked...
function Main({
  weatherData,
  cards,
  cardClick,
  handleLikeClick,
  isLoggedIn,
  currentUser,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  if (!weatherData) return null;

  const currentWeather = weatherData.temperature;

  // Filter cards via temp and condition
  const weatherType = () => {
    if (currentWeather >= 86) {
      return "hot";
    } else if (currentWeather >= 66 && currentWeather <= 85) {
      return "warm";
    } else if (currentWeather <= 65) {
      return "cold";
    }
  };

  // toLowerCase weather value as some may be capitalized
  // If need to see all cards then comment weatherType and .filter
  // card.weather.toLowerCase() === weatherType())
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        Today is{" "}
        {currentTemperatureUnit === "F"
          ? weatherData.temperatureF
          : weatherData.temperatureC}{" "}
        / You may want to wear:
      </h3>
      <ul className="main__items">
        {cards
          .filter((card) => card.weather === weatherType())
          .map((filteredCard) => (
            <ItemCard
              clothing={filteredCard}
              key={filteredCard._id}
              cardClick={cardClick}
              handleLikeClick={handleLikeClick}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
