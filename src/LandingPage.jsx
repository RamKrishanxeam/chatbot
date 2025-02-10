import React, { useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    setEmailError(""); // Clear the error when user starts typing
  };

  // const endpoint = "http://127.0.0.1:5000";
  const endpoint = "https://ai-chatbot-sky6.onrender.com";

  const handleSignIn = async () => {
    if (!isValidEmail(userEmail)) {
      setEmailError("Please enter a valid email address.");
      setTimeout(() => {
        setEmailError(""); // Clear the error after 4 seconds
      }, 4000);
      return;
    }
    const payload = new FormData();
    payload.append("email", userEmail);

    try {
      const response = await fetch(`${endpoint}/send_landing_page_emai`, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        localStorage.setItem("userEmail", userEmail); // Store email
        setUserEmail("");
      }
    } finally {
      navigate("/home");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="landing-container">
      {/* Mobile-only message */}
      <div className="mobile-warning">
        <p>
          Please use a laptop or desktop for the best experience. Mobile version
          coming soon.
        </p>
      </div>

      {/* Component 1 */}
      <div className="component-1">
        <div
          className="company-name"
          onClick={() => {
            navigate("/");
          }}
        >
          RARA AI
        </div>
        <div
          className="powered-by"
          onClick={() => {
            navigate("/");
          }}
        >
          Powered by VISUALEZ
        </div>
      </div>

      {/* Component 2 */}
      <div className="component-2">
        <div className="gen-ai-text">
          <span className="gen-ai-black">
            Bringing Gen AI solutions to the{" "}
          </span>
          <span className="gen-ai-blue">flooring industry</span>
        </div>
        <div className="email-input-container">
          <input
            className="email-input"
            type="email"
            name="email"
            value={userEmail}
            placeholder="Enter your email..."
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {emailError && <div className="error-message">{emailError}</div>}
        <div className="demo-button-container">
          <button className="demo-button" onClick={handleSignIn}>
            Start the demo
          </button>
        </div>
      </div>

      {/* Component 3 */}
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

export default LandingPage;
