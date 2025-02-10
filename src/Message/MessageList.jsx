import React, { useEffect, useRef } from "react";
import MessageBot from "../Components/MessageBot";
import MessageUser from "../Components/MessageUser";

const MessageList = ({
  messages,
  handleSendMessage,
  handleSelectedTile,
  handleUpload,
  loading,
  loadingIndex,
  isCountertop,
}) => {
  return (
    <>
      {messages.map((message, index) => {
        const MessageComponent =
          message.sender === "bot" ? MessageBot : MessageUser;
        return (
          <MessageComponent
            key={index}
            message={message}
            handleSendMessage={handleSendMessage}
            handleSelectedTile={handleSelectedTile}
            handleUpload={handleUpload}
            loading={loading}
            isLatestUpload={loadingIndex === index}
            loadingIndex={loadingIndex}
            isCountertop={isCountertop}
          />
        );
      })}
    </>
  );
};

export default MessageList;
