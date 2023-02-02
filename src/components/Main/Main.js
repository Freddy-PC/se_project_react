import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, defaultClothingItems }) {
  const currentWeather = weatherData.temperature;

  // Filter cards via temp
  //   if (currentWeather >= 86) {
  //     return "hot";
  //   } else if (currentWeather >= 66 && currentWeather <= 85) {
  //     return "warm";
  //   } else if (currentWeather <= 65) {
  //     return "cold";
  //   }

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        Today is {Math.round(currentWeather)}°F / You may want to wear:
      </h3>
      <ul className="main__items">
        {defaultClothingItems.map((card) => (
          <ItemCard clothing={card} key={card._id} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
