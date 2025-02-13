import React, { useState, useEffect } from "react";
import RouletteWheel from "./components/RouletteWheel";
import SpeakeasyCards from "./components/SpeakeasyCards";
import WelcomePopup from "./components/WelcomePopup";
import CasinoChecklist from "./components/CasinoChecklist";
import "./App.css";

function App() {
  const [rows, setRows] = useState(() => {
    // Load saved data from localStorage on initial render
    const savedRows = localStorage.getItem("casinoData");
    return savedRows ? JSON.parse(savedRows) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    casino: "",
    gamePlayed: "",
    winLoss: "",
    itemPurchased: "",
  });

  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem("welcomeSeen");
  });

  // Save to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem("casinoData", JSON.stringify(rows));
  }, [rows]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update existing row
      const updatedRows = [...rows];
      updatedRows[editingIndex] = formData;
      setRows(updatedRows);
      setEditingIndex(null);
    } else {
      // Add new row
      setRows([...rows, formData]);
    }
    setFormData({
      casino: "",
      gamePlayed: "",
      winLoss: "",
      itemPurchased: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(rows[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleCloseWelcome = () => {
    localStorage.setItem("welcomeSeen", "true");
    setShowWelcome(false);
  };

  return (
    <div className="App">
      {showWelcome && <WelcomePopup onClose={handleCloseWelcome} />}
      <header className="App-header">
        <h1>🎰 Tracy's Vegas Palooza 🎲</h1>
        <p className="header-subtitle">
          Happy Birthday Honeyshine! 🎉 Today is all about having fun while we
          explore our favorite place. This website is a fun place for you to
          keep track of everything we do today. There are speakeasies to find,
          gambling to be had, and shopping to be done! I love you and am so
          excited to celebrate with you
        </p>
        {/* <RouletteWheel /> */}
      </header>
      <SpeakeasyCards />
      <CasinoChecklist />
      <main>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="casino"
              placeholder="Casino Name"
              value={formData.casino}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="gamePlayed"
              placeholder="Game Played"
              value={formData.gamePlayed}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="winLoss"
              placeholder="Win/Loss Amount"
              value={formData.winLoss}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="itemPurchased"
              placeholder="Purchase"
              value={formData.itemPurchased}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {editingIndex !== null ? "Update Entry" : "Add Entry"}
            </button>
          </form>
        </section>
        <section className="table-section">
          <table>
            <thead>
              <tr>
                <th>Casino</th>
                <th>Game</th>
                <th>W/L</th>
                <th>Purchase</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.casino}</td>
                  <td>{row.gamePlayed}</td>
                  <td>{row.winLoss}</td>
                  <td>{row.itemPurchased}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
