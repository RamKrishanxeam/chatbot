import React, { useState } from "react";
import "./TileMessage.css";
import dummyData from "../../Resources/dummyData.json"; // Adjust the path
import TileModal from "./TileModal"; // Import the Modal component
import iButton from "../../Resources/i_button.png";
import dummyData2 from "../../Resources/countertopData.json";
import { SiStyledcomponents } from "react-icons/si";

const TileMessage = ({
  message,
  handleSelectedTile,
  loading,
  isCountertop,
}) => {
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [jsonData, setJsonData] = useState(dummyData);
  const [showModal, setShowModal] = useState(false);
  const [selectedTileData, setSelectedTileData] = useState(null); // State to hold selected tile data
  const [countertopData, setcountertopData] = useState(dummyData2);

  const tileCount = message.tiles.length;
  const fewTilesClass = tileCount < 3 ? "few-tiles" : ""; // Add class for fewer tiles
  const dummyNames = [
    "Zephyr",
    "Nimbus",
    "Aether",
    "Solara",
    "Lunar",
    "Nova",
    "Orion",
    "Echo",
    "Vega",
    "Blaze",
    "Lyra",
    "Cosmo",
    "Cinder",
    "Astra",
    "Halo",
    "Flare",
    "Drift",
    "Pulse",
    "Vortex",
    "Talon",
    "Sierra",
  ];
  const getProductName = (tileUrl) => {
    // First, try to find the tile using image_url
    let matchingTile = jsonData.find((tile) => tile.main_image_url === tileUrl);

    if (!matchingTile) {
      matchingTile = countertopData.find(
        (tile) => tile.main_image_url === tileUrl
      );
    }
    // If still no match, pick a random dummy name
    if (!matchingTile) {
      const randomDummyName =
        dummyNames[Math.floor(Math.random() * dummyNames.length)];
      return randomDummyName;
    }

    // Return the product name if a matching tile is found
    return matchingTile.product_name;
  };
  const getSpecialTag = (tileUrl) => {
    // First, try to find the tile using image_url
    let matchingTile = jsonData.find((tile) => tile.main_image_url === tileUrl);

    if (!matchingTile) {
      matchingTile = countertopData.find(
        (tile) => tile.main_image_url === tileUrl
      );
    }

    // If still no match, pick a random dummy name
    if (!matchingTile) {
      return null;
    }

    // Return the product name if a matching tile is found
    return matchingTile.category;
  };

  const getThumbnailUrl = (tileUrl) => {
    // First, try to find the tile using image_url
    let matchingTile = jsonData.find((tile) => tile.main_image_url === tileUrl);

    if (!matchingTile) {
      matchingTile = countertopData.find(
        (tile) => tile.main_image_url === tileUrl
      );
      if (matchingTile) {
        return matchingTile.thumbnail_url;
      }
      return null;
    }

    // If still no match, pick a random dummy name
    if (!matchingTile) {
      return null;
    }

    // Return the product name if a matching tile is found
    return matchingTile.main_image_url;
  };

  const handleInfoClick = (tileUrl) => {
    console.log(tileUrl);
    let matchingTile = jsonData.find((tile) => tile.main_image_url === tileUrl);
    if (!matchingTile) {
      matchingTile = countertopData.find(
        (tile) => tile.main_image_url === tileUrl
      );
    }
    console.log(matchingTile);
    setSelectedTileData(matchingTile);
    setShowModal(true);
  };

  return (
    <div className="tiles-container">
      <div className="header-text">{message.headertext}</div>
      <div className={`tiles-grid ${fewTilesClass}`}>
        {message.tiles.map((tile, index) => {
          const tileClass =
            tileCount === 1 ? "single" : tileCount === 2 ? "few" : "";

          return (
            <div
              key={index}
              className={`tile ${tileClass} ${
                selectedTileIndex === index ? "selected" : ""
              }`}
              onClick={() => {
                if (!loading) {
                  setSelectedTileIndex(index);
                  handleSelectedTile(tile);
                }
              }}
            >
              <div className="special-tag">{getSpecialTag(tile)}</div>
              <img
                style={{
                  width: "100%", // Adjust the width as needed
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px", // Optional: for rounded corners
                }}
                src={getThumbnailUrl(tile)}
                alt={`Tile ${index}`}
              />
              {/* Display the product name below the tile */}
              <div className="product-name">{getProductName(tile)}</div>
              {/* Information Button */}

              <button
                className="info-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfoClick(tile);
                }}
              >
                <img src={iButton} alt="Info" className="info-icon" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="related-text">{message.footertext}</div>
      {showModal && selectedTileData && (
        <TileModal
          tileData={selectedTileData}
          onClose={() => setShowModal(false)}
          handleSelectedTile={handleSelectedTile}
          loading={loading}
          isCountertop={isCountertop}
        />
      )}
    </div>
  );
};

export default TileMessage;
