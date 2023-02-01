import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData }) {
  const actualWeather = weatherData.temperature;
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        {/* Auto updates weather temp */}
        Today is {Math.round(actualWeather)}°F / You may want to wear:
      </h3>
      <ul className="main__items">{/* cards */}</ul>
    </main>
  );
}

export default Main;
