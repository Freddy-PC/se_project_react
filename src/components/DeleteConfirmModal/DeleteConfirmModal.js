import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({
  onClose,
  handleCancel,
  handleCardDelete,
  onClick,
}) => {
  return (
    <div className="delete-modal" onClick={onClick}>
      <div className="delete-modal__container">
        <button
          onClick={onClose}
          type="button"
          className="delete-modal__close-button"
          alt="close button"
        />
        <div className="delete-modal__info">
          <p className="delete-modal__title">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <button
            className="delete-modal__delete-button"
            onClick={handleCardDelete}
          >
            Yes, delete item!
          </button>
          <button
            className="delete-modal__cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
