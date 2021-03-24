import Board from "./Board";

const BattleshipBoards = props => {
  return (
    <div
      className="BattleshipBoards"
      style={{ width: "90%", margin: "auto", display: "flex" }}>
      <Board game={props} playerNum={0} />
      <Board game={props} playerNum={1} />
    </div>
  );
};

export default BattleshipBoards;
