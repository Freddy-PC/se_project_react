// import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.png";

const Header = () => {
  // if statement for weather

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoImage} alt="Weather Logo" className="header__logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              /* Add click handler for button */
              <button className="navigation__button">+ Add clothes</button>
            </li>
            <li>
              <div className="navigation__link"></div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// WeatherData.city will display the city from openWeather API
