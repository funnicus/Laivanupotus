import { Link } from "react-router-dom";

/*
 * React-component for the Credits-page
 */
const Credits = () => {
  return (
    <div>
      <Link to="/">
        <button title="Takaisin" className="back-button">
          <img src="./icons/arrow-left.svg" />
        </button>
      </Link>
      <h1 className="title">Tekijät</h1>
      <div id="credits-container">
        <h2 className="credit-name">Juhana - Drag and Drop</h2>
        <h2 className="credit-name">Juho - Grafiikat</h2>
        <h2 className="credit-name">Matias - Laivanupotus</h2>
        <h2 className="credit-name">Millina - Menu ja Setup Form</h2>
      </div>
    </div>
  );
};

export default Credits;
