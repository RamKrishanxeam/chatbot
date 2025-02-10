import React, { useState } from "react";
import "./OptionsMessage.css"; // Make sure you have the CSS for styling

const OptionsMessage = ({ message, handleSendMessage, loading }) => {
  const [customInput, setCustomInput] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Other");
  const [isOtherDisabled, setIsOtherDisabled] = useState(false);

  const handleCustomInputSubmit = (event) => {
    if (event.key === "Enter" && customInput.trim() !== "") {
      handleSendMessage(customInput);
      setCustomInput("");
      setPlaceholderText("Other...");
      setIsOtherDisabled(true);
    }
  };

  const handleOptionClick = (option) => {
    if (!loading) {
      handleSendMessage(option);
      setIsOtherDisabled(true);
    }
  };

  return (
    <div className="options-message">
      <div className="options-text">{message.text}</div>

      {/* Map over options excluding "Other" */}
      <div className="bot-options-items-container">
        {message.options
          .filter((option) => option !== "Other")
          .map((option, index) => (
            <div
              key={index}
              className="bot-option-item"
              onClick={() => handleOptionClick(option)}
              role="button"
              tabIndex={0} // Make the div focusable
              aria-label={`Select option: ${option}`} // For accessibility
            >
              {option}
            </div>
          ))}
        {message.options.includes("Other") && (
          <div className="bot-option-item">
            <input
              type="text"
              value={customInput}
              placeholder={placeholderText}
              onChange={(e) => setCustomInput(e.target.value)}
              onFocus={() => setPlaceholderText("Type your choice")}
              onBlur={() => setPlaceholderText("Other")}
              onKeyDown={handleCustomInputSubmit}
              className="input-element"
              disabled={isOtherDisabled}
              aria-label="Custom input for other option" // For accessibility
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionsMessage;
