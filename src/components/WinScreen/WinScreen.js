import { Link } from "react-router-dom";
import "./WinScreen.css";

const WinScreen = ({ game, setShowWinScreen }) => {
  const playerName =
    game.ctx.currentPlayer === "0" ? game.G.player1Name : game.G.player2Name;

  const newGame = () => {
    game.moves.resetGame();
  };

  return (
    <div id="winScreenContainer">
      <div className="WinScreen">
        <button id="close-button" onClick={() => setShowWinScreen(false)}>
          <img src="./icons/x.svg" />
        </button>
        <h1 className="title ws">{playerName} voitti pelin!</h1>
        <div id="wsButtonContainer">
          <Link to="/play">
            <button className="home-button ws" onClick={newGame}>
              Pelaa uudestaan!
            </button>
          </Link>
          <Link to="/">
            <button className="home-button ws">Lopeta pelaaminen</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;
