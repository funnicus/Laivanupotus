import { Link } from "react-router-dom";

/*
 * React-component for the Credits-page
 */
const Credits = () => {
  return (
    <div>
      <Link to="/">
        <button title="Takaisin" className="back-button">
          ←
        </button>
      </Link>
      <h1 className="title">Tekijät</h1>
      <div id="credits-container">
        <h2 className="credit-name">Juhana</h2>
        <h2 className="credit-name">Juho</h2>
        <h2 className="credit-name">Matias</h2>
        <h2 className="credit-name">Millina</h2>
      </div>
    </div>
  );
};

export default Credits;
