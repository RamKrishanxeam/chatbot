import React, { useState } from "react";
import countertopThumbnail from "../Resources/counterthumb.jpg";

function DefaultCountertopImage({
  handleSendMessage,
  imageSrc = countertopThumbnail,
  title = "Countertop",
  description = "Find stylish, functional countertops",
  buttonText = "",
  link = "#",
  customStyles = "mt-2",
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    handleSendMessage(title); // or any other logic you want on selection
  };

  return (
    <div className={`w-[240px] h-[200px] mb-4 `} onClick={handleSelect}>
      <a
        className={`p-2 rounded-lg shadow-md bg-white flex flex-col items-center ${customStyles} ${
          isSelected ? "border-2 border-blue-500" : ""
        }`}
        href={link}
      >
        <img
          src={imageSrc}
          alt={title}
          className="rounded-lg overflow-hidden border w-full h-[120px] object-cover"
        />
        <div className="mt-2 text-center">
          <h4 className="font-semibold text-[14px] text-[#171717]">{title}</h4>
          <p className="text-[#727681] text-[12px]">{description}</p>
          {buttonText && (
            <button
              type="button"
              className="mt-2 px-3 py-1 rounded-md bg-gray-800 text-white text-sm hover:bg-gray-900"
            >
              {buttonText}
            </button>
          )}
        </div>
      </a>
    </div>
  );
}

export default DefaultCountertopImage;
