// Not sure hows to implement closing modal when clicked outside ????
import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Handle logged status
  const [currentUser, setCurrentUser] = useState({}); // No user at start

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
    EDIT: "edit",
  };

  const handleRedirect = () => {
    activeModal === MODAL_TYPE.SIGNUP
      ? setActiveModal(MODAL_TYPE.LOGIN)
      : setActiveModal(MODAL_TYPE.SIGNUP);
  };

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
    const token = localStorage.getItem("token");
    getItems(token)
      .then((items) => {
        setClothingItems(items);
        console.log(setClothingItems(items));
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete card api id
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
        closeAllModals();
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    handleSignin(email, password);
  }

  // Handler for signin: check localstorage, close modal & sign-in user
  // login success = check server gave access in response & add to localStorage
  function handleSignin(email, password) {
    auth
      .userLogin(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token); // set string token
          setIsLoggedIn(true);
          closeAllModals();
          setCurrentUser(res);
        }
        auth.getUser(res.token).then((data) => {
          // check token
          setCurrentUser(data);
        });
      })
      .catch((err) => console.log(err));
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  }

  // On page load: Fetch the user info if possible
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getUser(token)
        .then((res) => {
          setCurrentUser(res); // res object
          setIsLoggedIn(true); // logs user back in if refresh
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__container">
            <Header
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              addModalClick={() => {
                setActiveModal(MODAL_TYPE.ADD);
              }}
              handleRegisterClick={() => {
                setActiveModal(MODAL_TYPE.SIGNUP);
              }}
              handleLoginClick={() => {
                setActiveModal(MODAL_TYPE.LOGIN);
              }}
            />
            <Switch>
              <ProtectedRoute
                path="/profile"
                loggedIn={isLoggedIn}
                currentUser={currentUser}
              >
                <Route path="/profile">
                  <Profile
                    cards={clothingItems}
                    cardClick={handleClick}
                    addModalClick={() => {
                      setActiveModal(MODAL_TYPE.ADD);
                    }}
                    handleEditClick={() => {
                      setActiveModal(MODAL_TYPE.EDIT);
                    }}
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                  />
                </Route>
              </ProtectedRoute>
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
              currentUser={currentUser}
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
              handleRedirect={handleRedirect}
            />
          )}
          {activeModal === MODAL_TYPE.LOGIN && (
            <LoginModal
              onClose={closeAllModals}
              handleSignin={handleSignin}
              handleRedirect={handleRedirect}
            />
          )}
          {activeModal === MODAL_TYPE.EDIT && (
            <EditProfileModal
              onClose={closeAllModals}
              // currentUser={currentUser}
              // handleEditProfile={handleEditProfile}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
