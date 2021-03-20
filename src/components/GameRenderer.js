import Setup from "./Setup/Setup";
import Board from "./Board";

const GameRenderer = props => {
  switch (props.ctx.phase) {
    default:
    case "setup":
      return <Setup {...props} />;

    case "play":
      return <Board {...props} />;
  }
};

export default GameRenderer;
