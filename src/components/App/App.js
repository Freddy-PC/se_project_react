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
// Suggest using createContext to change weatherCard?
import { getWeather, setDataFromWeatherApi } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { getItems, addItems, deleteItems } from "../../utils/api";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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
    DELETE: "delete", // Delete card
  };

  // On Modal when button clicked not 'preview'
  const closeAllModals = () => {
    setActiveModal("");
  };

  // Close on "Esc" key press anywhere
  // Set variable equal to 'esc' key equal to closeAllModals
  useEffect(() => {
    const closebyEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllModals();
      }
    };
    window.addEventListener("keydown", closebyEsc);
    return () => window.removeEventListener("keydown", closebyEsc);
  }, []);

  // Not sure hows to implement closing modal when clicked outside ????

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

  // Get cards
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete card vai id
  const handleCardDelete = (card) => {
    deleteItems(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        closeAllModals();
      })
      .catch((err) => console.log(err));
  };

  // Won't delete new cards???
  // Handler updates clothingItems state with array
  const handleAddItemSubmit = (name, link, weather) => {
    addItems(name, link, weather)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeAllModals();
      })
      .catch((err) => console.log(err));
  };

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
              <Profile
                cards={clothingItems}
                cardClick={handleClick}
                addModalClick={() => {
                  setActiveModal(MODAL_TYPE.ADD);
                }}
              />
            </Route>
            <Route path="/">
              <Main
                weatherData={weatherData}
                cards={clothingItems}
                cardClick={handleClick}
              />
            </Route>
          </Switch>
          <Footer />
        </div>

        {activeModal === MODAL_TYPE.ADD && (
          <AddItemModal
            onAddItem={handleAddItemSubmit}
            onClose={closeAllModals}
          />
        )}
        {activeModal === MODAL_TYPE.PREVIEW && (
          <ItemModal
            card={selectedCard}
            onClose={closeAllModals}
            handleDelete={() => {
              setActiveModal(MODAL_TYPE.DELETE);
            }}
          />
        )}
        {activeModal === MODAL_TYPE.DELETE && (
          <DeleteConfirmModal
            onClose={closeAllModals}
            handleCancel={() => {
              setActiveModal(MODAL_TYPE.PREVIEW);
            }}
            /* Makes Api call so clothingItems state is updated 
               via the 'selectedCard' */
            handleCardDelete={() => {
              handleCardDelete(selectedCard);
            }}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;
