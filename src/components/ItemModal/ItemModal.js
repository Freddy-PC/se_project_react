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
        <div className="item-modal__info">
          <div className="item-modal__description">
            <p className="item-modal__title">{card.name}</p>
            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>
          <button className="item-modal__delete-button">Delete item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
