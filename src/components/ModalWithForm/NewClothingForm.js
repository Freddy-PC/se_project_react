function NewClothingForm({ onNameChange, onImageChange, onWeatherChange }) {
  return (
    <>
      <h3 className="form__heading">Name</h3>
      <input
        class="form__input form__input_type_name"
        name="name"
        type="text"
        placeholder="Name"
        id="new-name"
        required
        onChange={onNameChange}
      />
      <h3 className="form__heading">Image</h3>
      <input
        class="form__input form__input_type_image"
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
            class="form__input_type_radio"
            name="weather"
            type="radio"
            id="Hot"
            onChange={onWeatherChange}
          />
          <label className="form__radio-label" for="Hot">
            Hot
          </label>
        </div>
        <div className="form__radio">
          <input
            class="form__input_type_radio"
            name="weather"
            type="radio"
            id="Warm"
            onChange={onWeatherChange}
          />
          <label className="form__radio-label" for="Warm">
            Warm
          </label>
        </div>
        <div className="form__radio">
          <input
            class="form__input_type_radio"
            name="weather"
            type="radio"
            id="Cold"
            onChange={onWeatherChange}
          />
          <label className="form__radio-label" for="Cold">
            Cold
          </label>
        </div>
      </div>
    </>
  );
}

export default NewClothingForm;
