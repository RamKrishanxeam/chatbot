import { useState, useEffect } from "react";

const UserSegmentImage = ({ originalUrl, segmentUrl }) => {
  const [currentImage, setCurrentImage] = useState(segmentUrl);
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === segmentUrl ? originalUrl : segmentUrl
      );
    }, 2000);

    return () => clearInterval(imageInterval); // Cleanup interval on component unmount
  }, [segmentUrl, originalUrl]);

  return (
    <div className="bg-[#E8EDF2] p-4 rounded-lg">
      <img
        src={currentImage}
        alt="room image"
        className="w-full h-auto rounded-lg transition-all duration-500"
      />
    </div>
  );
};

export default UserSegmentImage;
