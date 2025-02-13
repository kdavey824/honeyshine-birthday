import React from "react";
import "./WelcomePopup.css";

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Happy Birthday Tracy! 🎰</h2>
        <p>
          Welcome to your official birthday day! Hold down on the hidden
          speakeasies to reveal their hint. Find them all to trigger the
          confetti celebration! Win each listed game to keep the celebration
          rolling!
        </p>
        <p>
          We are also going on a shopping spree! As we stop at each casino, fill
          in the table with any games we played and gifts bought!
        </p>
        <button onClick={onClose}>Let's Begin!</button>
      </div>
    </div>
  );
};

export default WelcomePopup;
