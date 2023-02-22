import React from "react";
import "./ClothesSection.js";

function ClothesSection({ cards, cardClick }) {
  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__title">Your items</p>
        <button className="clothes__add-button">+Add new</button>
      </div>
      <ul className="clothes__items"></ul>
    </div>
  );
}

export default ClothesSection;
