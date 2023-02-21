import "./ToggleSwitch.css";
import { useContext, useState, useEffect } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // Import current unit context and subscribe
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  /* when checkbox is clicked:
     checked = when 'isChecked' is clicked setIsChecked..
     onChange = temp to F or C
     value =  value of temp*/
  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleSwitchChange}
        value={currentTemperatureUnit}
      />
      <div className="toggle-switch__slider" />
      <div className="toggle-switch__labels">
        <span>F</span>
        <span>C</span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
