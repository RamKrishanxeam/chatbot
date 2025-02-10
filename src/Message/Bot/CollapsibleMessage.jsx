import { useState } from "react";
import "./CollapsibleMessage.css";

// TabbedMessage Component
const CollapsibleMessage = ({ message }) => {
  const { options, text } = message;
  const [activeTab, setActiveTab] = useState(0);

  // Function to split description by line breaks or full stops
  const splitDescription = (description) => {
    // Split by line breaks and full stops, but ignore full stops within numbers or after dollar signs
    const lines = description
      .split(/(?<!\$\d+)\.(?!\d+)/)
      .flatMap((line) => line.split("\n"))
      .filter(Boolean);

    return lines.map((line) => line.trim());
  };

  return (
    <div className="tab-container">
      {/* Message Text */}
      <div className="collap-header-text">{text}</div>

      {/* Tabs Navigation */}
      <div className="tabs">
        {options.map((option, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {option.title}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {options[activeTab].subcategories.map((subcategory, subIndex) => (
          <div key={subIndex} className="subcategory">
            <div className="subcategory-name">{subcategory.name}</div>
            <div className="subcategory-description">
              {/* Split description and display as bullet points */}
              <ul>
                {splitDescription(subcategory.description).map(
                  (line, index) => (
                    <li key={index}>{line}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollapsibleMessage;
