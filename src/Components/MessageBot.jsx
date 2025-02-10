import React, { useState } from "react";
import FaqComponent from "./FaqComponent";
import RecommendProducts from "./RecommendProducts";
import UploadRoom from "./UploadRoom";
import SegmentImage from "./SegmentImage";
import TabsDetails from "./TabsDetails";
import StoreDetails from "./StoreDetails";
import CountertopDesign from "./CountertopDesign";
import DefaultImage from "./DefaultImage";
import flooringThumbnail from "../Resources/floorthumb.jpg";
import countertopThumbnail from "../Resources/counterthumb.jpg";
import IntermediateOptions from "./IntermediateOptions";

const MessageBot = ({
  message,
  handleSendMessage,
  handleSelectedTile,
  handleUpload,
  loading,
  isLatestUpload,
  loadingIndex,
  isCountertop,
  tag,
  imageSrc,
  altText,
}) => {
  const [selectedDefaultOption, setSelectedDefaultOption] = useState(null);

  const handleSelect = (title) => {
    setSelectedDefaultOption(title); // Set selected title in the parent component
    handleSendMessage(title);
  };

  const defaultOptions = [
    {
      imageSrc: flooringThumbnail,
      title: "Flooring",
      description: "Find perfect flooring for your needs",
      link: "#",
      customStyles: "mt-3",
      buttonText: "",
    },
    {
      imageSrc: countertopThumbnail,
      title: "Countertop",
      description: "Find stylish, functional countertops",
      link: "#",
      customStyles: "mt-3",
      buttonText: "",
    },
  ];

  return (
    <>
      <div
        className={`relative flex  w-full md:gap-[10px] ${message.customStyles} `}
      >
        {message.imgSource && (
          <img
            src={message.imgSource}
            alt="bot-icon"
            className={`${message.customClass} w-[26px] h-auto absolute -left-8 md:w-[35px] md:h-auto cursor-pointer md:absolute md:-left-10 mt-1`}
          />
        )}
        {(message.messageTitle || message.messageBody) && (
          <div
            className={`p-[12px] rounded-[12px]  bg-white `}
            style={{ boxShadow: "0px 8px 64px 0px #03214F0A" }}
          >
            {message.messageTitle && (
              <p className="text-[12px] md:text-[16px] lg:text-[16px]">
                {message.messageTitle}
              </p>
            )}
            {message.messageBody && (
              <p className="text-[12px] md:text-[16px] lg:text-[16px]">
                {message.messageBody}
              </p>
            )}
          </div>
        )}
      </div>

      {message.type === "firstMessage" && (
        <div className="block md:flex justify-start gap-3 mb-0 md:mb-16">
          {defaultOptions.map((opt, index) => (
            <DefaultImage
              key={index}
              {...opt}
              isSelected={selectedDefaultOption === opt.title} // Determine if the current image is selected
              onSelect={handleSelect} // Pass the handler to manage selection
            />
          ))}
        </div>
      )}
      {message.type === "options" && (
        <IntermediateOptions
          message={message}
          handleSendMessage={handleSendMessage}
        />
      )}
      {message.type === "tiles" && (
        <RecommendProducts
          customStyles={message.customStyles}
          altText="options"
          handleSelectedTile={handleSelectedTile}
          products={message.tiles}
        />
      )}
      {message.type === "upload" && (
        <UploadRoom handleUpload={handleUpload} loading={loading} />
      )}

      {message.type === "segment" && (
        <SegmentImage imageSource={message.segmentedUrl} />
      )}

      {message.type === "collapsible" && <TabsDetails message={message} />}

      {message.type === "store" && <StoreDetails options={message.options} />}

      {message.type === "countertopdesign" && (
        <CountertopDesign
          options={message.options}
          images={message.images}
          handleSendMessage={handleSendMessage}
          handleSelectedTile={handleSelectedTile}
          specialTag={message.specialTag}
        />
      )}
    </>
  );
};

export default MessageBot;
