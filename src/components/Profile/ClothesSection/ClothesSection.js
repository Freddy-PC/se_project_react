import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard.js";

function ClothesSection({ cards, cardClick, addModalClick }) {
  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__title">Your items</p>
        <button className="clothes__add-button" onClick={addModalClick}>
          +Add new
        </button>
      </div>
      <ul className="clothes__items">
        {cards.map((card, index) => (
          <ItemCard clothing={card} key={index} cardClick={cardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
