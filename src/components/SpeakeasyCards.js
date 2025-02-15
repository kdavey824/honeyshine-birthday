import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./SpeakeasyCards.css";

const speakeasyData = [
  {
    id: 1,
    name: "The Vault",
    location: "Bellagio",
    hint: "Hidden behind a false door in the high-limit room",
    found: false,
  },
  {
    id: 2,
    name: "The Barbershop",
    location: "Cosmopolitan",
    hint: "Need a haircut? Look for the janitor's door near Block 16",
    found: false,
  },
  {
    id: 3,
    name: "Ghost Donkey",
    location: "Cosmopolitan",
    hint: "Behind a door with a donkey symbol in Block 16",
    found: false,
  },
  {
    id: 4,
    name: "Easy's Cocktails",
    location: "Aria",
    hint: "Find the door with a gold knob near Lift Bar",
    found: false,
  },
  {
    id: 5,
    name: "1923 Prohibition",
    location: "Venetian",
    hint: "Look for the red light in Restaurant Row",
    found: false,
  },
  {
    id: 6,
    name: "The Count Room",
    location: "Flamingo",
    hint: "Behind a vintage phone booth",
    found: false,
  },
  {
    id: 7,
    name: "Caspians",
    location: "Caesars Palace",
    hint: "Hidden door near Vanderpump Cocktail Garden",
    found: false,
  },
  {
    id: 8,
    name: "Ski Lodge",
    location: "Cosmopolitan",
    hint: "Behind a hidden door near the buffet",
    found: false,
  },
];

const SpeakeasyCards = () => {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("speakeasyCards");
    return savedCards ? JSON.parse(savedCards) : speakeasyData;
  });
  const [showingHint, setShowingHint] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("speakeasyCards", JSON.stringify(cards));
  }, [cards]);

  const toggleCard = (id) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, found: !card.found } : card
      )
    );
    setShowingHint(null);
  };

  const handleMouseDown = (id) => {
    if (!cards.find((card) => card.id === id).found) {
      const timer = setTimeout(() => {
        setShowingHint(id);
      }, 500); // Show hint after 0.5 seconds
      return () => clearTimeout(timer);
    }
  };

  const handleMouseUp = () => {
    setShowingHint(null);
  };

  const allFound = cards.every((card) => card.found);

  return (
    <div className="speakeasy-container">
      {allFound && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.15}
          style={{
            position: "fixed",
            pointerEvents: "none",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100%",
            height: "100vh",
          }}
        />
      )}
      <h2>Hidden Speakeasies</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`playing-card ${card.found ? "found" : ""}`}
            onClick={() => toggleCard(card.id)}
            onMouseDown={() => handleMouseDown(card.id)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={() => handleMouseDown(card.id)}
            onTouchEnd={handleMouseUp}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-pattern"></div>
                {(!showingHint || card.id !== showingHint) && !card.found && (
                  <p className="card-location">{card.location}</p>
                )}
                {showingHint === card.id && !card.found && (
                  <div className="hint-overlay">
                    <p>{card.hint}</p>
                  </div>
                )}
              </div>
              <div className="card-back">
                <h3>{card.name}</h3>
                <p>{card.location}</p>
                {card.found && <span className="found-stamp">FOUND</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakeasyCards;
