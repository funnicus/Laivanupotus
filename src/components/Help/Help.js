import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div>
      <Link to="/">
        <button title="Takaisin" className="back-button">
          ←
        </button>
      </Link>
      <h1 className="title">Ohjeet</h1>
      <p id="help-text">
        
      </p>
    </div>
  );
};

export default Help;
