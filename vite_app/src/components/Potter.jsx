import React, { useState, useEffect } from "react";
import "./Potter.css";

const Potter = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
        setFilteredCharacters(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  return (
    <div className="potter-container">
      <h1 className="potter-title">Harry Potter Characters</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="potter-grid">
          {filteredCharacters.length === 0 ? (
            <p>No characters found matching your search.</p>
          ) : (
            filteredCharacters.slice(0, 30).map((character, index) => ( 
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
                <p className="potter-house">
                  <strong>House:</strong> {character.house || "No House"}
                </p>
                <p className="potter-actor">
                  <strong>Actor:</strong> {character.actor || "Unknown"}
                </p>
                <p className="potter-dob">
                  <strong>DOB:</strong> {character.dateOfBirth || "N/A"}
                </p>
                <p className="potter-ancestry">
                  <strong>Ancestry:</strong> {character.ancestry || "Unknown"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Potter;