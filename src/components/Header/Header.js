import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.png";
// import avatarImage from "../../images/avatar-image.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  isLoggedIn,
  addModalClick,
  handleRegisterClick,
  handleLoginClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // If logged in shows profile...if not shows sign up & sign in
  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/">
          <img src={logoImage} alt="Weather Logo" className="header__logo" />
        </NavLink>
        <p className="header__info">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <ul className="navigation__container">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <li>
                <button className="navigation__button" onClick={addModalClick}>
                  + Add clothes
                </button>
              </li>
              <li>
                <NavLink to="/profile" className="navigation__header-user">
                  <p className="navigation__user-info">
                    {currentUser.name}
                    <img
                      className="navigation__avatar"
                      src={currentUser.avatar}
                      alt="user avatar"
                    />
                  </p>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <button
                className="nav__register"
                type="button"
                onClick={handleRegisterClick}
              >
                Sign up
              </button>
              <button
                className="nav__login"
                type="button"
                onClick={handleLoginClick}
              >
                Log in
              </button>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
