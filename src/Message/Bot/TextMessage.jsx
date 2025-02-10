import React from "react";
import "./BotMessage.css"; // Ensure the CSS file is imported

const TextMessage = ({ message, loading }) => {
  // Check if message.text exists and is not empty
  if (!message.text) {
    return null; // Return nothing if text is empty or undefined
  }

  // Check if message type is "metadatatext"
  if (message.type === "metadatatext") {
    // Split the text by full stops and new lines into an array of sentences/lines
    const lines = message.text
      .split(/(?:\n|\.\s*)/)
      .filter((line) => line.trim().length > 0);

    // Create paragraphs with 2 lines each
    const paragraphs = [];
    for (let i = 0; i < lines.length; i += 2) {
      paragraphs.push(lines.slice(i, i + 2).join(". ") + ".");
    }

    return (
      <div className="bot-text-message">
        {paragraphs.map((para, index) => (
          <div key={index}>
            <p>{para}</p>
            <br /> {/* Line break after each paragraph */}
          </div>
        ))}
      </div>
    );
  }

  // Default rendering if not "metadatatext"
  // Process text to retain line breaks
  const lines = message.text.split("\n");

  return (
    <div className="bot-text-message">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br /> {/* Add a line break after each line */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextMessage;
