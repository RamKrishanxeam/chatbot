import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./TileModal.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

const TileModal = ({
  tileData,
  onClose,
  handleSelectedTile,
  loading,
  isCountertop,
}) => {
  const imageUrl = tileData.modal_url || tileData.main_image_url;
  // Function to handle check button clicks
  const handleCheck = (isCorrect) => {
    if (isCorrect) {
      handleSelectedTile(tileData.image_url); // Call the function to handle selected tile
      onClose(); // Close the modal after selecting the tile
    } else {
      onClose(); // Close the modal for the wrong check
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </button>

        <div className="left-section">
          <div className="modal-image-container">
            <Zoom
              zoomImg={{
                src: imageUrl, // Zoomed image (high resolution)
                alt: tileData.product_name,
              }}
            >
              <img
                src={imageUrl} // Default image URL (either modal_url or main_image_url)
                alt={tileData.product_name}
                className="modal-image"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Zoom>
          </div>
          <div className="thumbnail-text">Click on the product to zoom</div>
        </div>

        {/* Right section for specifications */}
        <div className="right-section">
          <div className="modal-details">
            <h2 className="modal-title">
              Product Name: {tileData.product_name}
            </h2>

            <div className="specifications">
              <h3 className="warranty-title">Aesthetics Details</h3>
              {tileData.specifications.primary_colors && (
                <div className="specification-item">
                  <span className="spec-key">Color:</span>
                  <span className="spec-value">
                    {tileData.specifications.primary_colors}
                  </span>
                </div>
              )}
              {tileData.specifications.shade_variations && (
                <div className="specification-item">
                  <span className="spec-key">Shade Variations:</span>
                  <span className="spec-value">
                    {tileData.specifications.shade_variations}
                  </span>
                </div>
              )}
              {tileData.specifications.style && (
                <div className="specification-item">
                  <span className="spec-key">Style:</span>
                  <span className="spec-value">
                    {tileData.specifications.style}
                  </span>
                </div>
              )}
              {tileData.specifications.variations && (
                <div className="specification-item">
                  <span className="spec-key">Shade Variation:</span>
                  <span className="spec-value">
                    {tileData.specifications.variations}
                  </span>
                </div>
              )}
              {tileData.specifications.available_finishes && (
                <div className="specification-item">
                  <span className="spec-key">Available Finish:</span>
                  <span className="spec-value">
                    {tileData.specifications.available_finishes}
                  </span>
                </div>
              )}
            </div>

            <div className="warranty-section">
              <h3 className="warranty-title">Technical Details</h3>
              {tileData.category && (
                <div className="warranty-item">
                  <span className="warranty-key">Category:</span>
                  <span className="warranty-value">{tileData.category}</span>
                </div>
              )}
              {tileData.specifications.thickness && (
                <div className="warranty-item">
                  <span className="warranty-key">Thickness:</span>
                  <span className="warranty-value">
                    {tileData.specifications.thickness}
                  </span>
                </div>
              )}
              {tileData.specifications.wear_layer && (
                <div className="warranty-item">
                  <span className="warranty-key">Wear Layer:</span>
                  <span className="warranty-value">
                    {tileData.specifications.wear_layer}
                  </span>
                </div>
              )}
              {tileData.application && tileData.application.Residential && (
                <div className="warranty-item">
                  <span className="warranty-key">Residential Use:</span>
                  <span className="warranty-value">
                    {tileData.application.Residential}
                  </span>
                </div>
              )}
              {tileData.application && tileData.application.Commercial && (
                <div className="warranty-item">
                  <span className="warranty-key">Commercial Use:</span>
                  <span className="warranty-value">
                    {tileData.application.Commercial}
                  </span>
                </div>
              )}
            </div>
            <div className="specifications">
              <h3 className="warranty-title">Other Details</h3>
              {tileData.specifications.series_names && (
                <div className="specification-item">
                  <span className="spec-key">Series Names:</span>
                  <span className="spec-value">
                    {tileData.specifications.series_names}
                  </span>
                </div>
              )}
              {tileData.specifications.LVT_type && (
                <div className="specification-item">
                  <span className="spec-key">LVT Type:</span>
                  <span className="spec-value">
                    {tileData.specifications.LVT_type}
                  </span>
                </div>
              )}
              {tileData.specifications.with_acoustic_pad && (
                <div className="specification-item">
                  <span className="spec-key">With Acoustic Pad:</span>
                  <span className="spec-value">
                    {tileData.specifications.with_acoustic_pad}
                  </span>
                </div>
              )}
              {tileData.specifications.zero_acclimation && (
                <div className="specification-item">
                  <span className="spec-key">Zero Acclimation:</span>
                  <span className="spec-value">
                    {tileData.specifications.zero_acclimation}
                  </span>
                </div>
              )}
              {tileData.specifications.environmental && (
                <div className="specification-item">
                  <span className="spec-key">Certificates:</span>
                  <span className="spec-value">
                    {tileData.specifications.environmental}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileModal;
