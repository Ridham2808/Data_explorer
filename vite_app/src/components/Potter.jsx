import React, { useState, useEffect } from "react";
import "./Potter.css";

const Potter = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("characters");
  const [loading, setLoading] = useState(true);

  const apiUrls = {
    characters: "https://hp-api.onrender.com/api/characters",
    books: "https://hp-api.onrender.com/api/books",
    houses: "https://hp-api.onrender.com/api/houses",
    spells: "https://hp-api.onrender.com/api/spells",
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = (tab) => {
    setLoading(true);
    fetch(apiUrls[tab])
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="potter-container">
      <h1 className="potter-title">Harry Potter Data</h1>

      <div className="tabs">
        {Object.keys(apiUrls).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="potter-grid">

          {activeTab === "characters" &&
            data.map((character, index) => (
              <div className="potter-card" key={index}>
                <img
                  src={
                    character.image ||
                    "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={character.name}
                  className="potter-img"
                />
                <h2 className="potter-name">{character.name}</h2>
                <p><strong>House:</strong> {character.house || "Unknown"}</p>
                <p><strong>Actor:</strong> {character.actor || "Unknown"}</p>
                <p><strong>DOB:</strong> {character.dateOfBirth || "N/A"}</p>
              </div>
            ))}

          {activeTab === "books" &&
            data.map((book, index) => (
              <div className="potter-card" key={index}>
                <h2 className="potter-name">{book.title}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Release Date:</strong> {book.releaseDate || "N/A"}</p>
              </div>
            ))}

          {activeTab === "houses" &&
            data.map((house, index) => (
              <div className="potter-card" key={index}>
                <h2 className="potter-name">{house.name}</h2>
                <p><strong>Head:</strong> {house.headOfHouse}</p>
                <p><strong>Founder:</strong> {house.founder}</p>
                <p><strong>Colors:</strong> {house.houseColours}</p>
              </div>
            ))}

          {activeTab === "spells" &&
            data.map((spell, index) => (
              <div className="potter-card" key={index}>
                <h2 className="potter-name">{spell.name}</h2>
                <p><strong>Type:</strong> {spell.type || "Unknown"}</p>
                <p><strong>Effect:</strong> {spell.effect || "Unknown"}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Potter;