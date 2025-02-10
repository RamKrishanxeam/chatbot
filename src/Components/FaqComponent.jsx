import React, { useState } from "react";

function FaqComponent({
  imageSrc,
  altText,
  messageTitle,
  messageBody,
  text,
  customStyles = "",
  customBg = "",
  isSelected, // New prop to track if the option is selected
  onSelect,
  specialTag,
}) {
  // State to track selection
  const regex = /\(([^)]+)\)/; // Match content inside parentheses
  const match = messageBody.match(regex);

  // If there's a match, use it as text and update messageBody without the parentheses text
  const extractedText = match ? match[1] : null;
  const updatedMessageBody = extractedText
    ? messageBody.replace(regex, "").trim()
    : messageBody;

  // Handle selection to toggle border color
  const handleSelection = () => {
    onSelect(messageBody); // Notify parent about the selection/deselection
    if (specialTag) {
      handleSendMessage(messageBody);
    }
  };

  return (
    <div
      className={`flex rounded-[12px] gap-[10px] mb-3 md:mb-0 ${customStyles} `}
      onClick={handleSelection}
    >
      <div
        className={`flex justify-between items-center bg-white w-full py-[5px] px-[10px] md:py-[10px] md:px-[16px] rounded-[100px] text-[12px] md:text-[16px] lg:text-[16px] ${customBg} ${
          isSelected ? "border-[1px] border-[#1D73F2]" : "" // Apply border if selected
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {messageTitle && <p className="font-bold">{messageTitle}</p>}
          <p>{updatedMessageBody}</p>
          {extractedText && (
            <p className="border border-[#755AEE] text-[#755AEE] px-[8px] py-[4px] text-[12px] rounded-full">
              {extractedText}
            </p>
          )}
        </div>

        <img
          src={imageSrc}
          alt={altText}
          className="w-[24px] h-[24px] cursor-pointer"
        />
      </div>
    </div>
  );
}

export default FaqComponent;
