function NewClothingForm({ onNameChange, onImageChange, onWeatherChange }) {
  return (
    <>
      <h3 className="form__heading">Name</h3>
      <input
        className="form__input form__input_type_name"
        name="name"
        type="text"
        placeholder="Name"
        id="new-name"
        required
        onChange={onNameChange}
      />
      <h3 className="form__heading">Image</h3>
      <input
        className="form__input form__input_type_image"
        name="image"
        type="url"
        placeholder="Image URL"
        id="new-image"
        required
        onChange={onImageChange}
      />
      <h3 className="form__heading">Select the Weather type:</h3>
      <div className="form__radio-container">
        <div className="form__radio">
          <input
            className="form__input_type_radio"
            name="weather"
            type="radio"
            id="Hot"
            // Value = onChange
            value="hot"
            onChange={onWeatherChange}
          />
          <label className="form__radio-label" htmlFor="Hot">
            Hot
          </label>
        </div>
        <div className="form__radio">
          <input
            className="form__input_type_radio"
            name="weather"
            type="radio"
            id="Warm"
            value="warm"
            onChange={onWeatherChange}
          />
          <label className="form__radio-label" htmlFor="Warm">
            Warm
          </label>
        </div>
        <div className="form__radio">
          <input
            className="form__input_type_radio"
            name="weather"
            type="radio"
            id="Cold"
            value="cold"
            onChange={onWeatherChange}
          />
          <label className="form__radio-label" htmlFor="Cold">
            Cold
          </label>
        </div>
      </div>
    </>
  );
}

export default NewClothingForm;
