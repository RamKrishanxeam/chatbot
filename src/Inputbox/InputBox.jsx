import React, { useState, useRef, useEffect } from "react";
import "./InputBox.css";
import { ImAttachment } from "react-icons/im";

const InputBox = ({ handleSendMessage, handleUpload, loading }) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null); // Reference for file input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue("");
      adjustTextareaHeight(); // Reset height after sending
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      handleUpload(file); // Pass the file to the upload handler
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(); // Adjust the height as the input changes
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset the height first
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
  };

  const handleKeyDown = (e) => {
    if (loading && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent sending if loading
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the newline from being added
      if (inputValue.trim()) {
        handleSendMessage(inputValue);
        setInputValue("");
        adjustTextareaHeight();
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Ensure textarea is initially sized correctly
  }, []);

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows="1"
        className="input-textarea"
        style={{ resize: "none", overflow: "hidden" }} // Prevent manual resizing and hide scrollbar
      />

      <button
        className="attach-button"
        type="button"
        onClick={triggerFileInput}
        aria-label="Attach a file"
      >
        <ImAttachment /> {/* Icon styling */}
      </button>

      <input
        type="file"
        accept="image/*" // Only allow image files
        style={{ display: "none" }} // Hide the input
        ref={fileInputRef} // Attach the ref
        onChange={handleFileChange} // Handle file change
      />

      <button
        type="submit"
        className="send-button"
        disabled={loading} // Disable the button when loading is true
        aria-label="Send message"
      >
        ➤
      </button>
    </form>
  );
};

export default InputBox;
