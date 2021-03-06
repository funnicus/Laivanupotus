import Settings from "./Settings/Settings";
import Setup from "./Setup/Setup";
import Play from "./Play/Play";
import { useLayoutEffect, useRef, useState } from "react";
import ChangeScreen from "./ChangeScreen/ChangeScreen";

/**
 * Renderöi pelaajien laudat
 * @param {*} props
 * @returns
 */
const GameRenderer = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useLayoutEffect(() => {
    if (props.ctx.phase !== "play") return;

    setShowOverlay(true); // näyttää peliruudun kun pelaaja vaihtuu
  }, [props.ctx.currentPlayer, props.ctx.phase]);

  const Game = () => {
    switch (props.ctx.phase) {
      default:
      case "settings":
        return <Settings game={props} />;

      case "setup":
        return <Setup {...props} />;

      case "play":
        return <Play {...props} />;
    }
  };

  /**
   * Renderöi pelaajan vaihtoruudun silloin kun täytyy
   */
  if (showOverlay) {
    return (
      <ChangeScreen
        playerNum={parseInt(props.ctx.currentPlayer) + 1}
        hide={() => setShowOverlay(false)}
        game={props}
      />
    );
  }

  return <Game />;
};

export default GameRenderer;
