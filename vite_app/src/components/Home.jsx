import React from "react";
import "./Home.css";

const Home = () => {

  return (
    <div className="home">
      <h1 className="home-title">Welcome To The React Data Explorer</h1>
      <p className="home-description">Explore diverse datasets with beautiful interfaces!</p>
      <div className="home-cards">
        <div className="home-card"> Meals </div>
        <div className="home-card"> Cocktails </div>
        <div className="home-card"> Potter </div>
        <div className="home-card"> Banks </div>
      </div>
    </div>
  );
};

export default Home;