import Settings from "./Settings/Settings";
import Setup from "./Setup/Setup";
import BattleshipBoards from "./Play/BattleshipBoards";
import { useEffect, useState } from "react";
import ChangeScreen from "./ChangeScreen/ChangeScreen";

const GameRenderer = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (props.ctx.phase !== "play") return;

    setShowOverlay(true);
  }, [props.ctx.currentPlayer]);

  console.log(props);

  const Game = () => {
    switch (props.ctx.phase) {
      default:
      case "settings":
        return <Settings game={props} />;

      case "setup":
        return <Setup {...props} />;

      case "play":
        return <BattleshipBoards {...props} />;
    }
  };

  if (showOverlay) {
    return (
      <ChangeScreen
        playerNum={parseInt(props.ctx.currentPlayer) + 1}
        hide={() => setShowOverlay(false)}
      />
    );
  }

  return <Game />;
};

export default GameRenderer;
