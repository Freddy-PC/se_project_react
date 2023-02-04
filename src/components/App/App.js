import React, { useState, useEffect } from "react";
// How do I get rid of white space outside project page...?
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

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // When image clicked...(clothing property accessed via 'card')
  const handleClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // On Modal when button clicked not 'preview'
  const closeAllModals = () => {
    setActiveModal("");
  };

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
  }, []); // Only called once to prevent Error: 429

  return (
    <div className="page">
      <div className="page__container">
        <Header
          weatherData={weatherData}
          addModalClick={() => {
            setActiveModal("add");
          }}
        />
        <Main
          weatherData={weatherData}
          cards={defaultClothingItems}
          cardClick={handleClick}
        />
        <Footer />
      </div>

      {activeModal === "add" && (
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          onClose={closeAllModals}
        >
          <NewClothingForm />
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )}
    </div>
  );
};

export default App;
