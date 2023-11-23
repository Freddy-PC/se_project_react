import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  onClose,
  title,
  children,
  buttonText,
  handleSubmit,
  handleRedirect,
  redirectText,
}) {
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
          <div className="form__redirect-container">
            <button className="form__redirect-button" type="submit">
              {buttonText}
            </button>
            <p className="form__redirect-text" onClick={handleRedirect}>
              {redirectText}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
