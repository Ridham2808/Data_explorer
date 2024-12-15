import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Meals.css";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="meals-container">
      <h1>Meals</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="meal-grid">
          {meals &&
            meals.map((meal) => (
              <div className="meal-card" key={meal.idMeal}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-img"
                />
                <h2>{meal.strMeal}</h2>
                <button
                  className="recipe-button"
                  onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                >
                  Reciepe
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Meals;