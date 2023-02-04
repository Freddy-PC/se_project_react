import "./ModalWithForm.css";

function ModalWithForm({ onClose, title, children, buttonText }) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button"
          alt="close button"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="form">
          {children}
          <button className="form__submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
