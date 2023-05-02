import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ onClose, title, children, buttonText, handleSubmit }) {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlay}>
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button"
          alt="close button"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="form" onSubmit={handleSubmit}>
          {children}
          <button className="form__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
