import attachment from "../../assets/images/attachment.png";
import send from "../../assets/images/send.png";
import React, { useState, useRef } from "react";

const InputBox = ({ handleSendMessage, loading, handleUpload }) => {
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null); // Reference for file input

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSendMessage(input);
        setInput("");
      }
    }
  };
  const handleSendMessageWithButton = (e) => {
    if (input.trim()) {
      handleSendMessage(input); // Call the main send message function
      setInput(""); // Clear the input field
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      handleUpload(file); // Pass the file to the upload handler
    }
  };

  return (
    <div className="flex items-center input-container absolute bottom-4 w-[342px] md:w-[628px] h-[56px] rounded-[12px] border  ">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        className="outline-none"
      />

      <div className="flex items-center">
        <button
          type="button"
          onClick={triggerFileInput}
          aria-label="Attach a file"
          style={{ background: "none", border: "none" }}
        >
          <img
            src={attachment}
            alt="Attach"
            className="w-[34px] h-[34px] cursor-pointer"
          />
        </button>
        <input
          type="file"
          accept="image/*" // Only allow image files
          style={{ display: "none" }} // Hide the input
          ref={fileInputRef} // Attach the ref
          onChange={handleFileChange} // Handle file change
        />
        <button
          type="button"
          onClick={() => handleSendMessageWithButton(input)} // Trigger send message function
          aria-label="Send message"
          disabled={!input.trim() || loading} // Disable if input is empty
          style={{ background: "none", border: "none" }} // Ensure no residual styles
        >
          <img
            src={send}
            alt="Send"
            className="w-[40px] h-[40px] cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
