import React, { useEffect, useState } from "react";
import "./Sports.css";

const Sports = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [originalTeams, setOriginalTeams] = useState([]);

  const fetchTeams = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams || []);
        setOriginalTeams(data.teams || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeams(
      "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Switzerland"
    );
  }, []);

  const handleSearch = () => {
    const filteredTeams = originalTeams.filter((team) =>
      team.strTeam.toLowerCase().includes(search.toLowerCase())
    );
    setTeams(filteredTeams);
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="sports-container">
      <h1 className="title">Soccer Teams in Switzerland</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="teams-grid">
        {teams.map((team) => (
          <div key={team.idTeam} className="team-card">
            <img
              src={team.strTeamBadge || team.strBadge}
              alt={team.strTeam}
              className="team-img"
            />
            <h2 className="team-name">{team.strTeam}</h2>

            <div className="team-details-grid">
              <div className="team-detail-item">
                <strong>ID:</strong> {team.idTeam}
              </div>
              <div className="team-detail-item">
                <strong>League:</strong> {team.strLeague}
              </div>
              <div className="team-detail-item">
                <strong>League-ID:</strong> {team.idLeague}
              </div>
              <div className="team-detail-item">
                <strong>Cup:</strong> {team.strLeague2 || "N/A"}
              </div>
              <div className="team-detail-item">
                <strong>Location:</strong> {team.strLocation || "N/A"}
              </div>
              <div className="team-detail-item">
                <strong>Gender:</strong> {team.strGender || "N/A"}
              </div>
              <div className="team-detail-item">
                <strong>Stadium:</strong> {team.strStadium || "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && <p className="no-results">No teams found.</p>}
    </div>
  );
};

export default Sports;