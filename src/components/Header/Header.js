import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.png";
import avatarImage from "../../images/avatar-image.png";

const Header = () => {
  // if statement for weather
  //   const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoImage} alt="Weather Logo" className="header__logo" />
        <p className="header__info">
          June 15, New York
          {/* {currentDate}, {weatherData.city} */}
        </p>
      </div>
      <div className="header__nav">
        <ul className="navigation__container">
          <li>
            <button className="navigation__button">+ Add clothes</button>
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

// WeatherData.city will display the city from openWeather API
