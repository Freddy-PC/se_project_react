import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.js";

const RegisterModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };
  const handleUsername = (evt) => {
    setUsername(evt.target.value);
  };
  const handleAvatar = (evt) => {
    setAvatar(evt.target.value);
  };

  // Needs ModalWithForm to handle data
  return (
    <>
      <ModalWithForm
        title="Sign up"
        buttonText="Sign up"
        onClose={onClose}
        // handleSubmit={handleSubmit}
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
        />
        <label className="form__heading">Name</label>
        <input
          className="form__input form__input_type_image"
          name="Name"
          type="text"
          placeholder="Name"
          id="Name"
          required
          onChange={handleUsername}
          value={username}
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
        <p className="form__auth-text">
          or
          <Link className="form__auth-link" to="/">
            Log in
          </Link>
        </p>
      </ModalWithForm>
    </>
  );
};

export default RegisterModal;
