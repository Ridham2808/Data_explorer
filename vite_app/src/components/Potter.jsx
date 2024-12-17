import React, { useState, useEffect } from "react";
import "./Potter.css";

const Potter = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("characters");
  const [loading, setLoading] = useState(true);

  const apiUrls = {
    characters: "https://hp-api.onrender.com/api/characters",
    books: "https://potterapi-fedeperin.vercel.app/en/books",
    houses: "https://potterapi-fedeperin.vercel.app/en/houses",
    spells: "https://potterapi-fedeperin.vercel.app/en/spells",
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
          {/* Characters */}
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
                <p><strong>eyeColour: </strong> {character.eyeColour || "N/A"}</p>
              </div>
            ))}

          {/* Books */}
          {activeTab === "books" &&
            data.map((book, index) => (
              <div className="potter-card" key={index}>
                <img
                  src={book.cover}
                  alt="Book Cover"
                  className="potter-img"
                />
                <h2 className="potter-name">{book.title}</h2>
                <p><strong>number:</strong> {book.number}</p>
                <p><strong>Pages:</strong> {book.pages}</p>
                <p><strong>Release Date:</strong> {book.releaseDate || "N/A"}</p>
              </div>
            ))}

          {/* Houses */}
          {activeTab === "houses" &&
            data.map((house, index) => (
              <div className="potter-card" key={index}>
                <p><strong>House:</strong> {house.house}</p>
                <p><strong>Founder:</strong> {house.founder}</p>
                <p><strong>animal:</strong> {house.animal}</p>
                <p><strong>emoji:</strong> {house.emoji}</p>
              </div>
            ))}

          {/* Spells */}
          {activeTab === "spells" &&
            data.map((spell, index) => (
              <div className="potter-card" key={index}>
                <h2 className="potter-name">{spell.name}</h2>
                <p><strong>index:</strong> {spell.index || "0"}</p>
                <p><strong>spell:</strong> {spell.spell || "Unknown"}</p>
                <p><strong>use:</strong> {spell.use || "Unknown"}</p>
              </div>
            ))}

        </div>
      )}
    </div>
  );
};

export default Potter;