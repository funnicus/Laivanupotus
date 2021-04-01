import Board from "./Board";
import "./Board.css";

const Play = (props) => {
  return (
    <>
      <div id="message">
        <h2>{props.G.message}</h2>
      </div>
      <div className="BattleshipBoards">
        <Board game={props} playerNum={0} />
        <Board game={props} playerNum={1} />
      </div>
    </>
  );
};

export default Play;
