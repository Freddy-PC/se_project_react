import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {
  latitude,
  longitude,
  key,
  // weatherForecast,
} from "../../utils/constants";
import { getWeather, setDataFromWeatherApi } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewClothingForm from "../../components/ModalWithForm/NewClothingForm";
import Profile from "../Profile/Profile";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Handle changing temp unit
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // When image clicked...(clothing property accessed via 'card')
  const handleClick = (card) => {
    setSelectedCard(card);
    setActiveModal(MODAL_TYPE.PREVIEW);
  };

  // Use 'enum' style to add values
  const MODAL_TYPE = {
    ADD: "add", // + Add clothes button
    PREVIEW: "preview", // Clothing images
  };

  /* How should I go about closing with the Escape Key
     or pressing outside the modal ??? */

  // On Modal when button clicked not 'preview'
  const closeAllModals = () => {
    setActiveModal("");
  };

  // Get data from weatherAPI
  useEffect(() => {
    if (latitude && longitude) {
      // Get weather info
      getWeather(latitude, longitude, key)
        .then((data) => {
          // Update weather info
          setWeatherData(setDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []); // Only called once to prevent Error: 429

  /* Should 'CurrentTemperatureUnitContext' only wrap around Header and Main
     since other components and settings dont need it */
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__container">
          <Header
            weatherData={weatherData}
            addModalClick={() => {
              setActiveModal(MODAL_TYPE.ADD);
            }}
          />
          <Switch>
            <Route path="/profile">
              <Profile cards={defaultClothingItems} cardClick={handleClick} />
            </Route>
            <Route path="/">
              <Main
                weatherData={weatherData}
                cards={defaultClothingItems}
                cardClick={handleClick}
              />
            </Route>
          </Switch>
          <Footer />
        </div>

        {activeModal === MODAL_TYPE.ADD && (
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            onClose={closeAllModals}
          >
            <NewClothingForm />
          </ModalWithForm>
        )}
        {activeModal === MODAL_TYPE.PREVIEW && (
          <ItemModal card={selectedCard} onClose={closeAllModals} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;
