import "./ChangeScreen.css";

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
