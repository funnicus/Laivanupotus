import "./ChangeScreen.css";

/**
 * Overlay component to render when players are switching seats.
 * Shows the name of the player that is up next and a button to start the turn
 * @param {object} props { hide, playerNum, game }
 */
const ChangeScreen = ({ hide, playerNum, game }) => {
  const playerName = playerNum === 1 ? game.G.player1Name : game.G.player2Name;

  return (
    <div className="ChangeScreen">
      <div id="turn">
        <h1>Vuorossa: {playerName}</h1>
        <button className="home-button" onClick={hide}>
          Aloita vuoro
        </button>
      </div>
    </div>
  );
};

export default ChangeScreen;
