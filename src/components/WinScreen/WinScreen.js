import { Link } from "react-router-dom";
import "./WinScreen.css";

/**
 * Winscreen-component represents the end of the game when the winner is announced
 * and the players are asked if they want to play again or stop playing.
 * @param {Object} game boardgame.io
 * @param {Object} setShowWinScreen method to show the win screen
 * @returns
 */
const WinScreen = ({ game, setShowWinScreen }) => {
  const playerName =
    game.ctx.currentPlayer === "0" ? game.G.player1Name : game.G.player2Name;

  const newGame = () => {
    game.moves.resetGame();
  };

  /*
   * Layout of the win screen
   */
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
