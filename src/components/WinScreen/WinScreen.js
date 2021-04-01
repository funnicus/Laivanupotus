import { Link } from "react-router-dom";
import "./WinScreen.css";

const WinScreen = ({ game }) => {
  const playerName =
    game.ctx.currentPlayer === "0" ? game.G.player1Name : game.G.player2Name;

  const newGame = () => {
    game.moves.resetGame();
  };

  return (
    <div className="WinScreen">
      <h1 className="title">{playerName} voitti pelin!</h1>
      <Link to="/play">
        <button onClick={newGame}>Pelaa uudestaan!</button>
      </Link>
      <Link to="/">
        <button>Lopeta pelaaminen</button>
      </Link>
    </div>
  );
};

export default WinScreen;
