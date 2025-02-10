import React, { useState } from "react";
import "./ContactPage.css";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  // const endpoint = "http://127.0.0.1:5000";
  const endpoint = "https://ai-chatbot-sky6.onrender.com";

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    setEmailError(""); // Clear the error when user starts typing
  };
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };
  const handleSubmit = async () => {
    if (!isValidEmail(userEmail)) {
      setEmailError("Please enter a valid email address.");
      setTimeout(() => {
        setEmailError(""); // Clear the error after 4 seconds
      }, 4000);
      return;
    }
    const payload = new FormData();
    payload.append("name", userName);
    payload.append("email", userEmail);
    payload.append("message", userMessage);

    try {
      const response = await fetch(`${endpoint}/send_email`, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setSubmitMessage("Your message has been sent successfully!");
        setUserName("");
        setUserEmail("");
        setUserMessage("");
      } else {
        setSubmitMessage("There was an error sending your message.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="contact-container">
      {/* Component 1 */}
      <div className="contact-component-1">
        <div
          className="contact-company-name"
          onClick={() => {
            navigate("/");
          }}
        >
          RARA AI
        </div>
        <div
          className="contact-powered-by"
          onClick={() => {
            navigate("/");
          }}
        >
          Powered by VISUALEZ
        </div>
      </div>

      {/* Component 2 */}
      <div className="contact-component-2">
        <div className="contact-gen-ai-text">
          <span className="contact-gen-ai-black">We're more than </span>
          <span className="contact-gen-ai-blue">happy to help you!</span>
        </div>
        <div className="contact-name-input-container">
          <input
            className="contact-name-input"
            type="name"
            placeholder="Enter your name..."
            onChange={handleNameChange}
          />
        </div>
        <div className="contact-email-input-container">
          <input
            className="contact-email-input"
            type="email"
            placeholder="Enter your email..."
            onChange={handleEmailChange}
          />
        </div>
        {emailError && (
          <div className="contact-error-message">{emailError}</div>
        )}{" "}
        <div className="contact-message-input-container">
          <textarea
            className="contact-message-input"
            placeholder="Mention your requirements, if any..."
            onChange={handleMessageChange}
            value={userMessage}
          ></textarea>
        </div>
        <div className="contact-submit-button-container">
          <button className="contact-submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {submitMessage && (
        <div className="contact-submit-message">{submitMessage}</div>
      )}
      <div className="component-3">
        <div className="award">
          <span className="award-text">
            <span className="bullet-point">•</span>
            <a
              href="https://youtube.com/shorts/Q1TNBhYlTXo?feature=shared"
              target="_blank"
              rel="noopener noreferrer"
              className="award-link"
            >
              Best Innovation Award
            </a>
            <span className="at-text"> at TISE 2024</span>
          </span>
        </div>
        <div className="contact-us">
          <span className="bullet-point">•</span>
          <p className="contact-link" onClick={handleContactClick}>
            Contact us
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
