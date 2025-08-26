import React, { useState } from "react";

const InputField = ({
  label,
  type = "text",
  className = "",
  userType = "patient",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const colorConfig = {
    patient: {
      borderColor: "#10b981",
      focusRingColor: "#bbf7d0",
      focusBorderColor: "#10b981",
    },
    clinic: {
      borderColor: "#bfdbfe",
      focusRingColor: "#3b82f6",
      focusBorderColor: "#3b82f6",
    },
    doctor: {
      borderColor: "#bbf7d0",
      focusRingColor: "#10b981",
      focusBorderColor: "#10b981",
    },
    admin: {
      borderColor: "#ddd6fe",
      focusRingColor: "#8b5cf6",
      focusBorderColor: "#8b5cf6",
    },
  };

  const currentConfig = colorConfig[userType] || colorConfig.patient;

  const inputStyles = {
    width: "100%",
    padding: "12px 16px",
    paddingRight: isPassword ? "80px" : "16px",
    border: `1px solid ${currentConfig.borderColor}`,
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s",
    fontSize: "16px",
  };

  const inputFocusStyles = {
    borderColor: currentConfig.focusBorderColor,
    boxShadow: `0 0 0 3px ${currentConfig.focusRingColor}25`,
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className={isPassword ? "relative" : ""}>
        <input
          type={inputType}
          style={inputStyles}
          onFocus={(e) => {
            Object.assign(e.target.style, inputFocusStyles);
          }}
          onBlur={(e) => {
            e.target.style.borderColor = currentConfig.borderColor;
            e.target.style.boxShadow = "none";
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-gray-500 hover:text-gray-700 px-2 py-1 transition-colors"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
