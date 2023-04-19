// Not sure hows to implement closing modal when clicked outside ????
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

import auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Handle logged status
  const [currentUser, setCurrentUser] = useState({}); // No user at start

  // Would it be more optimal to make something like this for the header?
  // handleRegisterClick={handleRegisterClick}
  // const handleRegisterClick = () => setActiveModal(MODAL_TYPE.SIGNUP);

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
    SIGNUP: "signup",
    LOGIN: "login",
  };

  // On Modal when button clicked not 'preview'
  const closeAllModals = () => {
    setActiveModal("");
  };

  // Close on "Esc" key press anywhere
  useEffect(() => {
    const closebyEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllModals();
      }
    };
    window.addEventListener("keydown", closebyEsc);
    return () => window.removeEventListener("keydown", closebyEsc);
  }, []);

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

  // Handler for signup: close modal & automatically sign-in user
  function handleRegister({ name, avatar, email, password }) {
    auth
      .userRegister(name, avatar, email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeAllModals();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  // Handler for signin: check localstorage, close modal & sign-in user
  // login success = check server gave access in response & add to localStorage
  function handleSignin({ email, password }) {
    auth
      .userAuthorize(email, password)
      .then((res) => {
        // logged in will be true & res = user
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeAllModals();
      })
      .catch((err) => console.log(err));
  }

  // Check JWT when mounting app
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUser(token)
        .then((res) => {
          // logged in will be true & res = user
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, []); // Should this have a value...log

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              isLoggedIn={isLoggedIn}
              handleRegisterClick={() => {
                setActiveModal(MODAL_TYPE.SIGNUP);
              }}
              handleLoginClick={() => {
                setActiveModal(MODAL_TYPE.LOGIN);
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
              /* Makes Api call so clothingItems state isLoggedIn updated 
               via the 'selectedCard' */
              handleCardDelete={() => {
                handleCardDelete(selectedCard);
              }}
            />
          )}

          {activeModal === MODAL_TYPE.SIGNUP && (
            <RegisterModal
              onClose={closeAllModals}
              handleRegister={handleRegister}
            />
          )}
          {activeModal === MODAL_TYPE.LOGIN && (
            <LoginModal onClose={closeAllModals} handleSignin={handleSignin} />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
