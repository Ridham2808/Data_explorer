import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <h1 className="home-title">Discover the World of React Data Explorer</h1>
        <p className="home-description">
          An immersive experience to explore Meals, Cocktails, Potter, Albums, Teams and Banks Data!
        </p>

        <div className="home-cards">
          <div className="home-card">
            <span className="emoji">🍽️</span>
            <h3>Meals</h3>
            <p>Explore delicious recipes worldwide.</p>
          </div>
          <div className="home-card">
            <span className="emoji">🍹</span>
            <h3>Cocktails</h3>
            <p>Find refreshing drinks for every occasion.</p>
          </div>
          <div className="home-card">
            <span className="emoji">🪄</span>
            <h3>Potter</h3>
            <p>Magical content from the wizarding world.</p>
          </div>
          <div className="home-card">
            <span className="emoji">🎶</span>
            <h3>Albums</h3>
            <p>Explore the best albums and music worldwide.</p>
          </div>
          <div className="home-card">
            <span className="emoji">⚽</span>
            <h3>Sports</h3>
            <p>Discover the world’s most popular sport.</p>
          </div>
          <div className="home-card">
            <span className="emoji">🏦</span>
            <h3>Banks</h3>
            <p>Search and explore Indian banks.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;