import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.js";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  // Needs ModalWithForm to handle data
  return (
    <>
      <ModalWithForm
        title="Log in"
        buttonText="Log in"
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
        <p className="form__auth-text">
          or
          <Link className="form__auth-link" to="/">
            Register
          </Link>
        </p>
      </ModalWithForm>
    </>
  );
};

export default LoginModal;
