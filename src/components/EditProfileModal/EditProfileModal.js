import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.js";

const EditProfileModal = ({
  onClose,
  currentUser,
  handleEditProfile,
  isLoading,
}) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleName = (evt) => {
    setName(evt.target.value);
  };
  const handleAvatar = (evt) => {
    setAvatar(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleEditProfile(name, avatar);
    history.push("/profile");
  }

  // Profile values returned when modal opened
  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText={isLoading ? "Saving..." : "Save"}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <label className="form__heading">Name</label>
      <input
        className="form__input form__input_type_image"
        name="name"
        type="text"
        placeholder="Name"
        id="name"
        required
        onChange={handleName}
        value={name}
      />
      <label className="form__heading">Avatar URL</label>
      <input
        className="form__input form__input_type_image"
        name="Avatar URL"
        type="text"
        placeholder="Avatar URL"
        id="avatar-URL"
        required
        onChange={handleAvatar}
        value={avatar}
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
