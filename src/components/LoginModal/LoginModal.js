import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.js";

const LoginModal = ({ onClose, handleSignin, handleRedirect, isLoading }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    handleSignin(email, password);
    history.push("/profile");
  }

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Saving..." : "Log in"}
      onClose={onClose}
      handleSubmit={handleSubmit}
      handleRedirect={handleRedirect}
      redirectText={"or Register"}
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
    </ModalWithForm>
  );
};

export default LoginModal;
