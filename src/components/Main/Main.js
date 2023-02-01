import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData }) {
  const currentWeather = weatherData.temperature;
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        Today is {Math.round(currentWeather)}°F / You may want to wear:
      </h3>
      <ul className="main__items">{/* cards */}</ul>
    </main>
  );
}

export default Main;
