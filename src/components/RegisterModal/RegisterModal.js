import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.js";

const RegisterModal = ({
  onClose,
  handleRegister,
  handleRedirect,
  isLoading,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };
  const handleName = (evt) => {
    setName(evt.target.value);
  };
  const handleAvatar = (evt) => {
    setAvatar(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({ name, avatar, email, password });
    history.push("/profile");
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Saving..." : "Sign up"}
      onClose={onClose}
      handleSubmit={handleSubmit}
      handleRedirect={handleRedirect}
      redirectText={"or Log in"}
    >
      <label className="form__heading">Email</label>
      <input
        className="form__input form__input_type_image"
        name="email"
        type="text"
        placeholder="Email"
        id="email"
        required
        onChange={handleEmail}
        value={email}
        minLength="1"
        maxLength="30"
      />
      <label className="form__heading">Password</label>
      <input
        className="form__input form__input_type_image"
        name="password"
        type="text"
        placeholder="Password"
        id="password"
        required
        onChange={handlePassword}
        value={password}
        minLength="5"
      />
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
        minLength="1"
        maxLength="30"
      />
      <label className="form__heading">Avatar URL</label>
      <input
        className="form__input form__input_type_image"
        name="Avatar URL"
        type="url"
        placeholder="Avatar URL"
        id="avatar-url"
        required
        onChange={handleAvatar}
        value={avatar}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
