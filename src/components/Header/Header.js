import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.png";
import avatarImage from "../../images/avatar-image.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

const Header = ({ weatherData, addModalClick }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
          <li>
            <button className="navigation__button" onClick={addModalClick}>
              + Add clothes
            </button>
          </li>
          <li>
            <NavLink to="/profile" className="navigation__header-user">
              <p className="navigation__user-info">
                Terrence Tegegne
                <img
                  className="navigation__avatar"
                  src={avatarImage}
                  alt="user avatar"
                />
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
