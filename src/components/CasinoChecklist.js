import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./CasinoChecklist.css";

const casinoGames = [
  { id: 1, name: "Blackjack", won: false },
  { id: 2, name: "Roulette", won: false },
  { id: 3, name: "Slots", won: false },
  { id: 4, name: "Craps", won: false },
];

const CasinoChecklist = () => {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("casinoGames");
    return savedGames ? JSON.parse(savedGames) : casinoGames;
  });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [scrollPosition, setScrollPosition] = useState({
    x: window.scrollX,
    y: window.scrollY,
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
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("casinoGames", JSON.stringify(games));
  }, [games]);

  const toggleGame = (id) => {
    setGames(
      games.map((game) => (game.id === id ? { ...game, won: !game.won } : game))
    );
  };

  const allWon = games.every((game) => game.won);

  return (
    <div className="checklist-container">
      {allWon && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          drawShape={(ctx) => {
            const symbols = ["$", "💵", "💰", "💎"];
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            ctx.font = "48px Arial";
            ctx.fillStyle = symbol === "$" ? "#85bb65" : "#ffffff";
            ctx.fillText(symbol, 0, 0);
          }}
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
      <h2>Casino Games Checklist</h2>
      <p className="checklist-instructions">
        Check off the game after it has been won
      </p>
      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-item ${game.won ? "won" : ""}`}
            onClick={() => toggleGame(game.id)}
          >
            <span className="game-name">{game.name}</span>
            <span className="checkmark">💰</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasinoChecklist;
