import { Link } from "react-router-dom";

/*
 * React-component for the Help-page
 */
const Help = () => {
  return (
    <div>
      <Link to="/">
        <button title="Takaisin" className="back-button">
          <img src="./icons/arrow-left.svg" />
        </button>
      </Link>
      <h1 className="title">Ohjeet</h1>
      <p id="help-text"></p>
    </div>
  );
};

export default Help;
