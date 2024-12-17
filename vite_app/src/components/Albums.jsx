import React, { useState, useEffect } from "react";
import "./Albums.css";

const Audio = () => {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://www.theaudiodb.com/api/v1/json/2/album.php?i=112024"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch album data.");
        }
        const data = await response.json();
        setAlbums(data.album || []);
        setFilteredAlbums(data.album || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = albums.filter(
      (album) =>
        album.strAlbum.toLowerCase().includes(term) ||
        album.strArtist.toLowerCase().includes(term)
    );
    setFilteredAlbums(filtered);
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleBack = () => {
    setSelectedAlbum(null);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (selectedAlbum) {
    return (
      <div className="audio-detail">
        <button className="back-button" onClick={handleBack}>
          &larr; Back to Albums
        </button>
        <h1 className="detail-title">{selectedAlbum.strAlbum}</h1>
        <div className="detail-content">
          <img
            src={
              selectedAlbum.strAlbumThumb ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={selectedAlbum.strAlbum}
            className="detail-image"
          />
          <div className="detail-info">
            <p>
              <strong>Genre:</strong> {selectedAlbum.strGenre || "N/A"}
            </p>
            <p>
              <strong>Artist:</strong> {selectedAlbum.strArtist || "N/A"}
            </p>
            <p>
              <strong>Label:</strong> {selectedAlbum.strLabel || "N/A"}
            </p>
            <p>
              <strong>Album ID:</strong> {selectedAlbum.idAlbum || "N/A"}
            </p>
            <p>
              <strong>Release Format:</strong>{" "}
              {selectedAlbum.strReleaseFormat || "N/A"}
            </p>
            <p>
              <strong>Mood:</strong> {selectedAlbum.strMood || "N/A"}
            </p>
            <p>
              <strong>Score:</strong> {selectedAlbum.intScore || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedAlbum.strDescriptionEN || "N/A"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-container">
      <h1 className="audio-title">Search Albums</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by album or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="album-list">
        {filteredAlbums.map((album) => (
          <div
            key={album.idAlbum}
            className="album-card"
            onClick={() => handleAlbumClick(album)}
          >
            <img
              src={
                album.strAlbumThumb ||
                "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt={album.strAlbum}
              className="album-img"
            />
            <h2 className="album-name">{album.strAlbum}</h2>
            <p className="album-year">Year: {album.intYearReleased || "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Audio;
