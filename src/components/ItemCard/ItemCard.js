import "./ItemCard.css";

function ItemCard({ clothing, cardClick }) {
  return (
    // List of cards
    <li className="card">
      <div className="card__wrapper">
        <h3 className="card__title">{clothing.name}</h3>
        <img
          // When clicked gets clothig data
          onClick={() => {
            cardClick(clothing);
          }}
          className="card__image"
          src={clothing.link}
          alt={clothing.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
