import React, { useState } from "react";
import "./ImageOptions.css"; // Make sure you have the CSS for styling
import notsureimage from "../../Resources/notsure2.png";
const ImageOptions = ({ message, handleSendMessage, loading }) => {
  const handleOptionClick = (option, id) => {
    if (!loading) {
      handleSendMessage(option);
    }
  };

  return (
    <div className="image-options-message">
      <div className="image-options-text">{message.text}</div>

      {/* Map over options excluding "Other" */}
      <div className="bot-image-options-items-container">
        {message.options
          .filter((option) => option !== "Other")
          .map((option, index) => (
            <div
              key={index}
              className="bot-image-option-item"
              onClick={() => handleOptionClick(option)}
              role="button"
              tabIndex={0} // Make the div focusable
              aria-label={`Select option: ${option}`} // For accessibility
              style={{
                display: "flex",
                flexDirection: "column", // Stack items vertically
                alignItems: "center", // Center align the content
              }}
            >
              {/* Display the image */}
              {message.images && message.images[index] && (
                <img
                  src={message.images[index]}
                  alt={`Image for ${option}`}
                  className="image-option-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px", // Circular image
                    marginBottom: "10px", // Space between image and text
                    filter:
                      message.images[index] === notsureimage
                        ? "grayscale(100%)"
                        : "none",
                  }}
                />
              )}
              {/* Display the text below the image */}
              <span>
                {option === "Flooring" || option === "Countertop" ? option : ""}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageOptions;
