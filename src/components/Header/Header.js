import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.png";
import avatarImage from "../../images/avatar-image.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ weatherData, addModalClick }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoImage} alt="Weather Logo" className="header__logo" />
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
            <p className="navigation__user-info">
              Terrence Tegegne
              <img
                className="navigation__avatar"
                src={avatarImage}
                alt="user avatar"
              />
            </p>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
