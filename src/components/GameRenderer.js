import Setup from "./Setup/Setup";
import BattleshipBoards from "./Play/BattleshipBoards";

const GameRenderer = props => {
  switch (props.ctx.phase) {
    default:
    case "setup":
      return <Setup {...props} />;

    case "play":
      return <BattleshipBoards {...props} />;
  }
};

export default GameRenderer;
