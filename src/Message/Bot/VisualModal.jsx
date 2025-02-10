import React from "react";
import "./VisualModal.css";
import { AiOutlineClose } from "react-icons/ai";

const VisualModal = ({ children, onClose }) => {
  return (
    <div className="visual-modal-overlay" onClick={onClose}>
      <div
        className="visual-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="visual-modal-close-button" onClick={onClose}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default VisualModal;
