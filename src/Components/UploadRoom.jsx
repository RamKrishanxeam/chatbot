import React, { useState } from "react";
import UploadImage from "../assets/images/house_upload.png";

const UploadRoom = ({ handleUpload, loading }) => {
  const fileInputRef = React.useRef(null); // Reference for file input
  const [fileName, setFileName] = useState(""); // File name display

  // Trigger file input when "browse" is clicked or area is clicked
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFileName(file.name); // Update file name
      handleUpload(file); // Pass the file to the upload handler
    }
  };

  return (
    <div className="px-0 py-0 md:px-3 md:py-3">
      <div className="bg-white px-[12px] pb-3 rounded-xl">
        <h6 className="text-dark font-bold mb-5 pt-2">
          Upload your room photo for real-time preview
        </h6>
        <div
          className="bg-[#F5F9FE] border-[#C0D8FB] rounded-lg flex flex-col justify-center items-center py-5 border-dotted border-2"
          onClick={triggerFileInput} // Trigger file input on click
          role="button" // Accessibility
          tabIndex={0} // Makes it focusable
          onKeyDown={(e) => e.key === "Enter" && triggerFileInput()} // Keyboard support
        >
          <img
            src={UploadImage}
            alt="Upload your room image"
            className="w-16 h-auto"
          />
          <h6 className="font-semibold">Upload your room image</h6>
          <p className="text-[12px] text-[#727681]">
            Drop your image here, or
            <span
              className="text-[#1D73F2] ms-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click trigger
                triggerFileInput();
              }}
            >
              browse
            </span>
          </p>
        </div>
        <input
          type="file"
          accept="image/*" // Only allow image files
          style={{ display: "none" }} // Hide file input
          ref={fileInputRef} // Attach ref to input
          onChange={handleFileChange} // Handle file selection
          disabled={loading} // Disable during loading
        />
        {fileName && (
          <p className="text-sm text-center mt-2 text-[#727681]">
            Selected file: <span className="font-semibold">{fileName}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadRoom;
