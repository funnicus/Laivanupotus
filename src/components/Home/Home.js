import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home-bg">
      <h1 className="title">Laivanupotus</h1>
      <div id="home-button-container">
        <Link to="/play">
          <button className="home-button">Aloita peli</button>
        </Link>
        <Link to="/help">
          <button className="home-button">Ohjeet</button>
        </Link>
        <Link to="/credits">
          <button className="home-button">Tekijät</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
