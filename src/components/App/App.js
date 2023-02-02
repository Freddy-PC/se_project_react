import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {
  latitude,
  longitude,
  key,
  weatherForecast,
} from "../../utils/constants";
import { getWeather, setDataFromWeatherApi } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";

const App = () => {
  const [weatherData, setWeatherData] = useState({});

  // Retreive data from weatherAPI
  useEffect(() => {
    if (latitude && longitude) {
      // Get weather info
      getWeather(latitude, longitude, key)
        .then((data) => {
          // Update weather info
          // console.log(data) returns all data
          setWeatherData(setDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  // Only called once to prevent Error: 429

  return (
    <div className="page">
      <div className="page__container">
        <Header weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          defaultClothingItems={defaultClothingItems}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;
