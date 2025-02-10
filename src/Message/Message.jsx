import React from "react";
import UserMessage from "./User/UserMessage";
import BotMessage from "./Bot/BotMessage";
import "./Message.css";

const Message = ({
  message,
  handleSendMessage,
  handleSelectedTile,
  handleUpload,
  loading,
  isLatestUpload,
  segmentedUrl,
  isCountertop,
}) => {
  const { sender } = message;

  return (
    <>
      {sender === "user" ? (
        <UserMessage
          message={message}
          loading={loading}
          isLatestUpload={isLatestUpload}
        />
      ) : (
        <BotMessage
          message={message}
          handleSendMessage={handleSendMessage}
          handleSelectedTile={handleSelectedTile}
          handleUpload={handleUpload}
          loading={loading}
          isCountertop={isCountertop}
        />
      )}
    </>
  );
};

export default Message;
