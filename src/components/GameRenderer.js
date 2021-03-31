import Setup from "./Setup/Setup";
import Play from "./Play/Play";
import { useEffect, useLayoutEffect, useState } from "react";
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
      />
    );
  }

  return <Game />;
};

export default GameRenderer;

export const SHIP_IMAGES = {
  carriers: [
    "./image/Carrier front.png",
    "./image/Carrier middle1.png",
    "./image/Carrier middle2.png",
    "./image/Carrier middle3.png",
    "./image/Carrier back.png",
  ],
  battleships: [
    "./image/Battleship front.png",
    "./image/Battleship middle1.png",
    "./image/Battleship middle2.png",
    "./image/Battleship back.png",
  ],
  cruisers: [
    "./image/Cruiser front.png",
    "./image/Cruiser middle.png",
    "./image/Cruiser back.png",
  ],
  submarines: [
    "./image/Submarine front.png",
    "./image/Submarine middle.png",
    "./image/Submarine back.png",
  ],
  destroyers: ["./image/Destroyer front.png", "./image/Destroyer back.png"],
};
