import "./ItemModal.css";

function ItemModal({ card, onClose, handleDelete, currentUser }) {
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner._id === currentUser._id;
  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `item-modal__delete-button ${
    isOwn ? "item-modal__delete-button" : "item-modal_delete-button_hidden"
  }`;

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
          <button className={itemDeleteButtonClassName} onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
