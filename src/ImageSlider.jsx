import React, { useState, useEffect } from "react";

const ImageSlider = ({ originalUrl, segmentedUrl }) => {
  const [isOriginal, setIsOriginal] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOriginal((prevIsOriginal) => !prevIsOriginal);
    }, 1500); // Change every 0.2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <img
        src={isOriginal ? originalUrl : segmentedUrl}
        alt={isOriginal ? "Original Image" : "Segmented Image"}
        className="image-slider-img"
      />
      {/* Optional: You can remove the button if you only want automatic toggling */}
      {/* <button onClick={() => setIsOriginal(!isOriginal)}>
        {isOriginal ? "Show Segmented" : "Show Original"}
      </button> */}
    </div>
  );
};

export default ImageSlider;
