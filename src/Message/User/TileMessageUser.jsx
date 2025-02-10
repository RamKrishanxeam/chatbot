import React from "react";
import "./TileMessageUser.css"; // Ensure this CSS file is created for styling

const TileMessageUser = ({ tileUrl, loading }) => {
  return (
    <div className="tile-message-user-container">
      <img
        src={tileUrl || "placeholder_image_url.jpg"}
        alt="Selected Tile"
        className="tile-image"
      />
      <p className="tile-message-text">This looks interesting!</p>
    </div>
  );
};

export default TileMessageUser;
