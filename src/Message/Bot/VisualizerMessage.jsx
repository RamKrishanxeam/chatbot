// version 4 -- caching html content for reuse

import React, { useState, useEffect } from "react";
import "./VisualizerMessage.css";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FourSquare } from "react-loading-indicators";
import VisualModal from "./VisualModal";

const VisualizerMessage = ({ message, projectId }) => {
  const [iframeContent, setIframeContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cachedContent, setCachedContent] = useState({}); // Cache for iframe content

  // const endpoint = "http://127.0.0.1:5000";
  const endpoint = "https://ai-chatbot-sky6.onrender.com";

  useEffect(() => {
    const fetchContent = async () => {
      const cacheKey = `${projectId}-${message.visualId}`;
      // Check if content is already cached
      if (cachedContent[cacheKey]) {
        setIframeContent(cachedContent[cacheKey]);
        setIsLoading(false); // Stop loading immediately
        return;
      }

      const payload = new FormData();
      payload.append("product_id", message.visualId);
      payload.append("new_name", message.text);

      try {
        const response = await fetch(`${endpoint}/fetch-and-modify`, {
          method: "POST",
          body: payload,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setIframeContent(data.html_content);

        // Cache the result
        setCachedContent((prevCache) => ({
          ...prevCache,
          [cacheKey]: data.html_content,
        }));

        // Set a timeout to display the animation for 3 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Failed to fetch modified content:", error);
      }
    };

    fetchContent();
  }, [projectId, message.visualId, cachedContent]);

  // Function to toggle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (isLoading) {
    return (
      <div className="bot-loading-container">
        <div className="loading-container">
          <FourSquare
            color="#616ab8"
            size="medium"
            text="CREATING A VIEW"
            textColor="#616ab8"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bot-visual-message">
      <div className="visualizer-container">
        {/* Display the 3D view in an iframe */}
        <iframe
          srcDoc={iframeContent}
          title="3D Viewer"
          className="visualizer-iframe"
          allowFullScreen
        ></iframe>
        {/* Open in new window icon */}
        <RxOpenInNewWindow className="open-modal-icon" onClick={toggleModal} />
      </div>

      {/* Modal for larger view */}
      {isModalOpen && (
        <VisualModal onClose={toggleModal}>
          <iframe
            srcDoc={iframeContent}
            title="3D Viewer Modal"
            className="visualizer-iframe-large"
            allowFullScreen
          ></iframe>
        </VisualModal>
      )}
    </div>
  );
};

export default VisualizerMessage;
