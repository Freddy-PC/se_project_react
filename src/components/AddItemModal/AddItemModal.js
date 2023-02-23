import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewClothingForm from "../ModalWithForm/NewClothingForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  /* use a useEffect hook to reset the input field state to empty strings when
     the modal is opened */
  //  isOpen(name, imageUrl, weather) = useState("");

  // create onChange handlers corresponding to each state variable
  const handleName = (evt) => {
    setName(evt.target.value);
  };

  const handleImageUrl = (evt) => {
    setImageUrl(evt.target.value);
  };
  const handleWeather = (evt) => {
    setWeather(evt.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    // call onAddItem with appropriate arguments
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  }

  /* don't forget to pass appropriate props to ModalWithForm 
     and contents of form in middle of component*/
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <NewClothingForm
        onNameChange={handleName}
        onImageChange={handleImageUrl}
        onWeatherChange={handleWeather}
      />
    </ModalWithForm>
  );
};

export default AddItemModal;
