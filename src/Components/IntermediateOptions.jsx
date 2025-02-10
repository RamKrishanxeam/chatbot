import React, { useState } from "react";
import FaqComponent from "./FaqComponent"; // assuming FaqComponent is imported correctly

const IntermediateOptions = ({ message, handleSendMessage }) => {
  // State to track selected options
  const [selectedOption, setSelectedOptions] = useState(null);

  // Handle selecting or deselecting an option
  const handleOptionSelection = (option) => {
    setSelectedOptions(option);
    handleSendMessage(option); // Call the provided handler when an option is selected
  };

  return (
    <div>
      {message.options.map((option, index) => (
        <FaqComponent
          key={index}
          messageBody={option}
          customStyles={message.customStyles}
          altText={option}
          imageSrc={message.optionsImageSource}
          isSelected={selectedOption === option} // Check if the option is selected
          onSelect={handleOptionSelection}
        />
      ))}
    </div>
  );
};

export default IntermediateOptions;
