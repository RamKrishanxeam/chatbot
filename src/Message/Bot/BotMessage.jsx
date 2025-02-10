import React from "react";
import TextMessage from "./TextMessage";
import CollapsibleMessage from "./CollapsibleMessage";
import OptionsMessage from "./OptionsMessage";
import TileMessage from "./TileMessage";
import "./BotMessage.css";
import UploadMessage from "./UploadMessage";
import StoreMessage from "./StoreMessage";
import VisualizerMessage from "./VisualizerMessage";
import ImageOptions from "./ImageOptions";

const BotMessage = ({
  message,
  handleSelectedTile,
  handleSendMessage,
  handleUpload,
  loading,
  isCountertop,
}) => {
  const { type } = message;

  switch (type) {
    case "text":
      return <TextMessage message={message} loading={loading} />;
    case "collapsible":
      return <CollapsibleMessage message={message} loading={loading} />;
    case "options":
      return (
        <OptionsMessage
          message={message}
          handleSendMessage={handleSendMessage}
          loading={loading}
        />
      );
    case "tiles":
      return (
        <TileMessage
          message={message}
          handleSelectedTile={handleSelectedTile}
          loading={loading}
          isCountertop={isCountertop}
        />
      );
    case "upload": // New case for upload message
      return (
        <UploadMessage
          loading={loading}
          handleUpload={handleUpload} // Function to handle the upload action
        />
      );
    case "store":
      return (
        <StoreMessage
          message={message}
          handleSendMessage={handleSendMessage}
          loading={loading}
        />
      );
    case "metadatatext":
      return (
        <TextMessage
          message={message}
          loading={loading}
          type={"metadatatext"}
        />
      );
    case "visualize":
      return (
        <VisualizerMessage message={message} projectId={message.visualId} />
      );
    case "imageoptions":
      return (
        <ImageOptions
          message={message}
          handleSendMessage={handleSendMessage}
          loading={loading}
        />
      );
    default:
      return null;
  }
};

export default BotMessage;
