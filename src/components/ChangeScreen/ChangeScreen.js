import "./ChangeScreen.css";

const ChangeScreen = ({ hide, playerNum }) => {
  return (
    <div className="ChangeScreen">
      <div>
        <h1>Player {playerNum}'s turn</h1>
        <button className="home-button" onClick={hide}>
          Start turn
        </button>
      </div>
    </div>
  );
};

export default ChangeScreen;
