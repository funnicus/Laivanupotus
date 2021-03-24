import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 id="title">Laivanupotus</h1>
      <div id="home-button-container">
        <div id="main-buttons">
          <Link to="/play">
            <button className="home-button">Aloita peli</button>
          </Link>
          <Link to="/help">
            <button className="home-button">Ohjeet</button>
          </Link>
        </div>
        <div id="credits-button">
          <button className="home-button">Tekijät</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
