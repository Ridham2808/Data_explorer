import React, { useEffect, useState } from "react";
import "./Cocktails.css";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="cocktails-container">
      <h1 className="title">Cocktails</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cocktails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : cocktails.length === 0 ? (
        <p>No cocktails found.</p>
      ) : (
        <div className="cocktail-grid">
          {cocktails.map((cocktail) => (
            <div className="cocktail-card" key={cocktail.idDrink}>
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="cocktail-img"
              />
              <h2 className="cocktail-name">{cocktail.strDrink}</h2>
              <p className="cocktail-id">ID: {cocktail.idDrink}</p>
              <p className="cocktail-category">Category: Cocktail</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cocktails;