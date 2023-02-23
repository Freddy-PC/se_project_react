import "./ItemModal.css";

function ItemModal({ card, onClose }) {
  return (
    <div className="item-modal">
      <div className="item-modal__container">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__close-button"
          alt="close button"
        />
        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />
        <p className="item-modal__title">{card.name}</p>
        <p className="item-modal__description">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
