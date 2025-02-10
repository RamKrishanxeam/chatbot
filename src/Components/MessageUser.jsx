import React from "react";
import ProductDetail from "./ProductDetail";
import UserImageUpload from "./UserImageUpload";
import userIcon from "../assets/images/user.png";
import UserSelectedTile from "./UserSelectedTile";
import UserSegmentImage from "./UserSegmentImage";
function MessageUser({
  message,
  handleSendMessage,
  handleSelectedTile,
  handleUpload,
  loading,
  isLatestUpload,
  loadingIndex,
  isCountertop,
}) {
  return (
    <div className={`flex justify-end  gap-[10px] ${message.customStyles}`}>
      <div className={`p-[10px] md:p-[12px] rounded-[12px] ${message.customBg}`}>
        {message.messageTitle && (
          <p className="font-bold">{message.messageTitle}</p>
        )}
        <p className="text-[12px] md:text-[16px] lg:text-[16px]">
          {message.messageBody}
        </p>
      </div>
      {message.imgSource ? (
        <img
          src={message.imgSource}
          alt="user-icon"
          className={`w-[26px] h-[26px] cursor-pointer absolute -right-5 mt-1`}
        />
      ) : (
        <div className="w-[26px] h-[26px]"></div>
      )}
      {message.type === "tile" && (
        <UserSelectedTile
          productName={message.title}
          productImage={message.text}
          productCategory={message.pre}
        />
      )}

      {message.type === "image" && (
        <UserImageUpload imageUrl={message.imageUrl} loading={loading} />
      )}

      {message.type === "segment" && (
        <UserSegmentImage
          originalUrl={message.originalImageUrl}
          segmentUrl={message.segmentedUrl}
        />
      )}
    </div>
  );
}

export default MessageUser;
