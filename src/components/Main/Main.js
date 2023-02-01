import React from "react";
import "./Main.css";

function Main() {
  return (
    <main className="main">
      {/* <WeatherCard /> */}
      <h3 className="main__header">Today is 75° F / You may want to wear:</h3>
      <ul className="main__items">{/* cards */}</ul>
    </main>
  );
}

export default Main;
