import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Meals from "./components/Meals";
import Cocktails from "./components/Cocktails";
import Potter from "./components/Potter";
import Banks from "./components/Banks";
import Recipe from "./components/Recipe";
import Albums from "./components/Albums";
import Sports from "./components/Sports";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/meals">Meals</Link>
          <Link to="/cocktails">Cocktails</Link>
          <Link to="/potter">Potter</Link>
          <Link to="/Albums">Albums</Link>
          <Link to="/Sports">Sports</Link>
          <Link to="/banks">Banks</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/potter" element={<Potter />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/Albums" element={<Albums />} />
            <Route path="/Sports" element={<Sports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;