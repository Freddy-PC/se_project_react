import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.js";

const LoginModal = ({ onClose, handleSignin, handleRedirect, isLoading }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  console.log(password);
  console.log(password.length);
  console.log(passwordError);

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = () => {
    if (email.trim() === "" || !emailRegex.test(email)) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
    validateEmail();
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
    validatePassword(evt);
  };

  function handleSubmit(e) {
    e.preventDefault();

    validateEmail();
    validatePassword();
    // Check for errors before submitting
    if (!emailError && !passwordError) {
      handleSignin(email, password);
      history.push("/profile");
    }
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
      {emailError && <p className="error-message">{emailError}</p>}
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
      {passwordError && <p className="error-message">{passwordError}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
