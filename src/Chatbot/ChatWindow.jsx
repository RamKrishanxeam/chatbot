import React, { useState } from "react";
import MessageList from "../Message/MessageList";
import InputBox from "../Inputbox/InputBox";
import "./ChatWindow.css";
import { FaRobot } from "react-icons/fa";

const ChatWindow = ({
  messages,
  handleSendMessage,
  handleSelectedTile,
  handleUpload,
  loading,
  loadingIndex,
  isCountertop,
}) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-icon">
          <FaRobot size={50} color="white" /> {/* Icon on the left */}
        </div>
        <div className="chat-title">
          <div className="title-text">Rara AI Assistant</div>
          <div className="status">
            <span className="online-dot"></span>
            <span>We are online to assist you</span>
          </div>
        </div>
      </div>
      <MessageList
        messages={messages}
        handleSendMessage={handleSendMessage}
        handleSelectedTile={handleSelectedTile}
        handleUpload={handleUpload}
        loading={loading}
        loadingIndex={loadingIndex}
        isCountertop={isCountertop}
      />
      <InputBox
        handleSendMessage={handleSendMessage}
        loading={loading}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default ChatWindow;
