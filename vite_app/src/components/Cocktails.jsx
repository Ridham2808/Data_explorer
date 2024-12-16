import React, { useEffect, useState } from "react";
import "./Cocktails.css";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const fetchCocktails = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data.drinks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => fetchCocktails("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"), []);

  const fetchDetails = (id) => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedCocktail(data.drinks[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading) return <p className="loading">Loading...</p>;

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
        <button onClick={() => fetchCocktails(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)} className="search-button">
          Search
        </button>
      </div>

      {selectedCocktail ? (
        <div className="cocktail-detail">
          <h2>{selectedCocktail.strDrink}</h2>
          <div className="detail-content">
            <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} className="detail-image" />
            <div>
              <p><strong>Category:</strong> {selectedCocktail.strCategory}</p>
              <p><strong>Type:</strong> {selectedCocktail.strAlcoholic}</p>
              <p><strong>Glass:</strong> {selectedCocktail.strGlass}</p>
              <p><strong>Ingredients:</strong></p>
              <ul>
                {Array.from({ length: 15 }, (_, i) => i + 1)
                  .map((n) => ({
                    ingredient: selectedCocktail[`strIngredient${n}`],
                    measure: selectedCocktail[`strMeasure${n}`],
                  }))
                  .filter((item) => item.ingredient)
                  .map((item, i) => (
                    <li key={i}>{item.ingredient} - {item.measure || "as needed"}</li>
                  ))}
              </ul>
              <p><strong>Instructions:</strong> {selectedCocktail.strInstructions}</p>
            </div>
          </div>
          <button onClick={() => setSelectedCocktail(null)} className="back-button">Back</button>
        </div>
      ) : (
        <div className="cocktail-grid">
          {cocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="cocktail-card" onClick={() => fetchDetails(cocktail.idDrink)}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-img" />
              <h2>{cocktail.strDrink}</h2>
              <p>ID: {cocktail.idDrink}</p>
              <p>Category: Cocktail</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cocktails;