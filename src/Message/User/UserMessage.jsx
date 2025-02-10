import React, { useEffect, useState } from "react";
import TileMessageUser from "./TileMessageUser";
import "./UserMessage.css";
import ImageSlider from "../../ImageSlider";

const UserMessage = ({ message, loading, isLatestUpload }) => {
  const { type, text, imageUrl, segmentedUrl } = message;
  const [bubblePositions, setBubblePositions] = useState(
    generateBubblePositions()
  );

  useEffect(() => {
    if (isLatestUpload && type === "image") {
      const intervalId = setInterval(() => {
        setBubblePositions(generateBubblePositions());
      }, 1200);
      return () => clearInterval(intervalId);
    }
  }, [isLatestUpload, type]);

  return (
    <div
      className={`user-message ${
        isLatestUpload ? "loading-active" : "loading-done"
      }`}
    >
      {type === "text" && <p className="user-message-text">{text}</p>}

      {type === "image" && (
        <div className="user-message-image-container">
          <img
            src={imageUrl}
            alt="User Upload"
            className="user-message-image"
          />
          {isLatestUpload && (
            <div className="overlay">
              <div className="grid-layer">
                {Array.from({ length: 20 }, (_, index) => (
                  <div key={index} className="grid-cell" />
                ))}
              </div>
              <div className="loading-bubbles">
                {bubblePositions.map((pos, index) => (
                  <span
                    key={index}
                    className="bubble"
                    style={{
                      top: `${pos.top}%`,
                      left: `${pos.left}%`,
                      width: `${pos.size}px`,
                      height: `${pos.size}px`,
                      "--i": index,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {type === "tile" && <TileMessageUser tileUrl={text} />}

      {type === "segment" && imageUrl && segmentedUrl && (
        <ImageSlider originalUrl={imageUrl} segmentedUrl={segmentedUrl} />
      )}
    </div>
  );
};

const generateBubblePositions = () => {
  return Array.from({ length: 20 }, () => ({
    top: Math.floor(Math.random() * 100),
    left: Math.floor(Math.random() * 100),
    size: Math.random() * 10 + 5,
  }));
};

export default UserMessage;
