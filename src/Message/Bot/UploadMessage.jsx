import React, { useState } from "react";
import "./UploadMessage.css"; // Ensure the CSS file is imported
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadMessage = ({ handleUpload, loading }) => {
  const fileInputRef = React.useRef(null); // Reference to the file input
  const [fileName, setFileName] = useState(""); // For showing the file name after selection
  const [imagePreview, setImagePreview] = useState(null); // For showing image preview

  // Trigger the file input when button is clicked
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file change via file input
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFileName(file.name); // Set file name for display
      handleUpload(file); // Pass the file to the upload handler

      // Preview the image if it's an image file
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Display image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="upload-container"
      onClick={triggerFileInput} // Trigger the file input when any part of the container is clicked
      role="button" // For accessibility
      tabIndex={0} // Makes the container focusable
      onKeyDown={(e) => e.key === "Enter" && triggerFileInput()} // Support keyboard interaction
      style={{ cursor: "pointer" }} // Indicate the area is clickable
    >
      <div className="upload-icon">
        <FaCloudUploadAlt />
      </div>

      <div className="upload-text-container">
        <span className="upload-main-text">Upload Your Room Image</span>
        <br />
        <span className="upload-sub-text">
          for personalized recommendations
        </span>
      </div>

      <input
        type="file"
        accept="image/*" // Only allow image files
        style={{ display: "none" }} // Hide the input
        ref={fileInputRef} // Attach the ref
        onChange={handleFileChange} // Handle file change
        disabled={loading}
      />
    </div>
  );
};

export default UploadMessage;
