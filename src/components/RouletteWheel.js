import React from "react";
import "./RouletteWheel.css";

const RouletteWheel = () => {
  return (
    <div className="roulette-wheel">
      <div className="wheel">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="number" />
        ))}
      </div>
    </div>
  );
};

export default RouletteWheel;
