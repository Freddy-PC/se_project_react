import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NewClothingForm from "../ModalWithForm/NewClothingForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ onAddItem, onClose, isLoading }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

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
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <NewClothingForm
        onNameChange={handleName}
        onImageChange={handleImageUrl}
        onWeatherChange={handleWeather}
        name={name}
        imageUrl={imageUrl}
      />
    </ModalWithForm>
  );
};

export default AddItemModal;
