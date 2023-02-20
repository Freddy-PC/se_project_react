import "./ToggleSwitch.css";
import { useContext, useState, useEffect } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // Import current unit context and subscribe
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  //
  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  //
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  /* checked = 
     onChange = 
     value =  */
  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label">
        <input
          className=""
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleSwitchChange}
          value={currentTemperatureUnit}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
