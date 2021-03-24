import Board from "./Board";
import "./Board.css";

const BattleshipBoards = props => {
  return (
    <div className="BattleshipBoards">
      <Board game={props} playerNum={0} size={5} />
      <Board game={props} playerNum={1} size={5} />
    </div>
  );
};

export default BattleshipBoards;
