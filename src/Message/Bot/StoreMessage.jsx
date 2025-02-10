import React from "react";
import "./StoreMessage.css"; // Ensure you have the correct CSS for styling

const StoreMessage = ({ message, handleSendMessage, loading }) => {
  const handleOptionClick = (option) => {
    if (!loading) {
      handleSendMessage(option);
    }
  };

  return (
    <div className="store-options-message">
      {message.text && <div className="store-options-text">{message.text}</div>}
      <div className="store-info">
        {message.options.map((mes, index) => (
          <div key={index} className="store-paragraph">
            <div className="store-item">
              {/* Store name with Google Maps link */}
              <div className="store-option-name">
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    mes.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mes.store_name}
                </a>
              </div>
              {/* Store address */}
              {/* <div className="store-option-address">{mes.address}</div> */}
              <div className="store-option-address">
                {mes.address.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
              {/* Store contact number */}
              {/* <div className="store-option-contact">{mes.contact_number}</div> */}
              {/* Store URL */}
              {/* <div className="store-option-url">{mes.url}</div> */}
              <div className="store-option-url">
                <a href={mes.url} target="_blank" rel="noopener noreferrer">
                  {mes.url}
                </a>
              </div>
            </div>

            {/* Grey horizontal line separator after each store */}
            {index < message.options.length - 1 && (
              <span className="divider"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreMessage;
