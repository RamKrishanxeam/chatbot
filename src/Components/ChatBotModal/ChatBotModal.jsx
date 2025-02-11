import "./ChatBotModal.css";
import React, { useState, useEffect, useRef } from "react";
import star from "../../assets/images/star.png";
import crossButton from "../../assets/images/crossButton.png";
import MessageList from "../../Message/MessageList";
import InputBox from "../InputBox/InputBox";
import attachment from "../../assets/images/attachment.png";
import send from "../../assets/images/send.png";
import MessageBot from "../MessageBot";
import MessageUser from "../MessageUser";
import botIcon from "../../assets/images/Frame-7.png";
import Loader from "../Loader";

const ChatBotModal = ({
  modalOpen,
  closeModal,
  messages,
  handleSendMessage,
  handleSelectedTile,
  handleUpload,
  loading,
  loadingIndex,
  isCountertop,
}) => {
  const chatBoxRef = useRef(null);

  // Auto-scroll effect with smooth behavior
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth", // Enables smooth scrolling
      });
    }
  }, [messages, loading]);

  return (
    modalOpen && (
      <div className="chatbot-container">
        <div className="flex items-center justify-between md:justify-start gap-3 p-3">
          <img
            src={star}
            alt="arrow down"
            className="w-[48px] md:w-[60px] h-full cursor-pointer"
          />
          <div>
            <p className="font-semibold text-[16px] md:text-[22px]">
              MSI x RARA AI Assistant
            </p>
            <p className="text-[#727681] text-[12px] md:text-[16px]">
              We are online to assist you
            </p>
          </div>
          <img
            src={crossButton}
            alt="crossButton"
            className="w-8 h-8 cursor-pointer block sm:hidden"
            onClick={closeModal}
          />
        </div>

        <div className="relative bg-[#F7F8F9] rounded-[18px] h-[759px]">
          <div
            ref={chatBoxRef}
            className="chat-box md:overflow-y-scroll h-[645px] md:h-[633px]"
          >
            <div className="rounded-[18px]  px-[15px] pb-[15px]">
              <div className="relative bg-[#F7F8F9]  h-full px-3 md:px-5">
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
                {loading && <Loader imageSrc={botIcon} />}
              </div>
            </div>

            <InputBox
              handleSendMessage={handleSendMessage}
              loading={loading}
              handleUpload={handleUpload}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBotModal;
