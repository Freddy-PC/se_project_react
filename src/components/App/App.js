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
import api from "../../utils/api";

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
  const [isLoading, setIsLoading] = useState(false); // watch loading states during server requests

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

  useEffect(() => {
    const closebyEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllModals();
      }
    };
    window.addEventListener("keydown", closebyEsc);
    return () => window.removeEventListener("keydown", closebyEsc);
  }, []);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeAllModals();
    }
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

  // Get cards in database
  // Should all cards appear on main? Only user cards should appear but then auth would be needed
  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete card api id
  // if card untrue not included in array
  const handleCardDelete = () => {
    api
      .deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
        closeAllModals();
      })
      .catch((err) => console.log(err));
  };

  // add cards
  const handleAddItemSubmit = (name, link, weather) => {
    api
      .addItems(name, link, weather)
      .then((item) => {
        setClothingItems([item.data, ...clothingItems]);
        console.log(item);
        closeAllModals();
      })
      .catch((err) => console.log(err));
  };

  // On page load: Fetch the user info if possible
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setCurrentUser(res); // res object
          setIsLoggedIn(true); // logs user back in if refresh
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  // Handler for signup: close modal & automatically sign-in user
  // Issue? : If refreshed after signing up logged-out...
  function handleRegister({ name, avatar, email, password }) {
    setIsLoading(true);
    auth
      .userRegister(name, avatar, email, password)
      .then((res) => {
        closeAllModals();
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Handler for signin: sign-in user, check user with token
  // login success = check server gave access in response & add to localStorage
  function handleSignin(email, password) {
    setIsLoading(true);
    auth
      .userLogin(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token); // set string token
          setIsLoggedIn(true);
          closeAllModals();
          setCurrentUser(res);
        }
        auth
          .checkToken(res.token)
          .then((data) => {
            // set user token & data
            setCurrentUser(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  }

  // Change profile name & avatar
  function handleEditProfile(name, avatar) {
    setIsLoading(true);
    auth
      .editUserInfo(name, avatar)
      .then((res) => {
        closeAllModals();
        setCurrentUser(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  //
  const handleLikeClick = (id, isLiked) => {
    // Check if this card is now liked

    isLiked
      ? // send a request to add the user's id to the card's likes array
        // card id match then update card, if not show only card
        // data property
        api
          .addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard.data : card))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          .removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard.data : card))
            );
          })
          .catch((err) => console.log(err));
  };
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
                    isLoggedIn={isLoggedIn}
                    handleLikeClick={handleLikeClick}
                  />
                </Route>
              </ProtectedRoute>
              <Route path="/">
                <Main
                  weatherData={weatherData}
                  cards={clothingItems}
                  cardClick={handleClick}
                  handleLikeClick={handleLikeClick}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              </Route>
            </Switch>
            <Footer />
          </div>

          {activeModal === MODAL_TYPE.ADD && (
            <AddItemModal
              onAddItem={handleAddItemSubmit}
              onClose={closeAllModals}
              isLoading={isLoading}
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
              onClick={handleOverlay}
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
              onClick={handleOverlay}
            />
          )}

          {activeModal === MODAL_TYPE.SIGNUP && (
            <RegisterModal
              onClose={closeAllModals}
              handleRegister={handleRegister}
              handleRedirect={handleRedirect}
              isLoading={isLoading}
            />
          )}
          {activeModal === MODAL_TYPE.LOGIN && (
            <LoginModal
              onClose={closeAllModals}
              handleSignin={handleSignin}
              handleRedirect={handleRedirect}
              isLoading={isLoading}
            />
          )}
          {activeModal === MODAL_TYPE.EDIT && (
            <EditProfileModal
              onClose={closeAllModals}
              currentUser={currentUser}
              handleEditProfile={handleEditProfile}
              isLoading={isLoading}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
