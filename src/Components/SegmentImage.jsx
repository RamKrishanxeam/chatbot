import React, { useState } from "react";
import fullexpand from "../assets/images/full-expand.png";
import crossbutton from "../assets/images/crossButton.png";

const SegmentImage = ({ imageSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Function to open the zoomed image modal
  const handleOpenPopup = () => {
    setIsModalOpen(true);
  };

  // Function to close the zoomed image modal
  const toggleModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-5 ml-10 relative">
      {/* Normal Image */}
      <img
        src={imageSource}
        alt="segmented image"
        className="w-full h-auto cursor-pointer"
        onClick={handleOpenPopup} // Open zoomed modal on click
      />

      {/* Zoom Button */}
      <img
        className="w-12 h-auto absolute right-2 top-2 bg-[#fff] px-3 py-3 rounded-md cursor-pointer"
        src={fullexpand}
        alt="zoom"
        onClick={handleOpenPopup}
      />

      {/* Modal for Zoomed Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-5 rounded-lg">
            <div className="flex justify-end">
              <img
                className="cursor-pointer w-[32px] h-[32px]"
                src={crossbutton}
                alt="close"
                onClick={toggleModal} // Close modal on click
              />
            </div>
            <img
              src={imageSource}
              alt="zoomed image"
              className="w-full h-auto" // Ensure image fits well in the modal
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentImage;
