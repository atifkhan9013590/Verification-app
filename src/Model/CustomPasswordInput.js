import React, { useState } from "react";
import "./CustomPasswordInput.css"; // Import custom styles

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const CustomPasswordInput = ({ password, label, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      {label && <label className="password-label">{label}</label>}
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={onChange}
          placeholder={placeholder}
          className="password-input"
        />
        <button
          type="button"
          className="show-password-button"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>}
        </button>
      </div>
    </div>
  );
};

export default CustomPasswordInput;
