import { useEffect } from "react";
import { useSfx } from "../../util/useAudio";
import WinScreen from "../WinScreen/WinScreen";
import Board from "./Board";
import "./Board.css";

/**
 * React-component that renders both players' boards.
 * Shown at the phase where players shoot at each others' ships.
 * @param {*} game
 */
const Play = (game) => {
  const message = game.G.message;

  const [playHit] = useSfx({
    url: "./assets/explosion_effect.mp3",
    volume: 0.15,
  });

  const [playSunk] = useSfx({
    url: "./assets/ship_sunk.mp3",
    volume: 0.2,
  });

  const [playGameOver] = useSfx({
    url: "./assets/water_splash.mp3",
    volume: 0.4,
  });

  // Play sound effects based on message changes
  useEffect(() => {
    let timeout;

    switch (message.type) {
      default:
      case "nohit":
        return;

      case "hit":
        playHit();
        break;

      case "sunk":
        playHit();
        timeout = setTimeout(playSunk, 1000);
        break;

      case "gameOver":
        playGameOver();
        break;
    }

    return () => clearTimeout(timeout);
  }, [message]);

  const gameIsOver = message.type === "gameOver";

  return (
    <>
      <div id="message">
        <h2>{message.text}</h2>
      </div>
      <div className="BattleshipBoards">
        <Board game={game} playerNum={0} />
        <Board game={game} playerNum={1} />
      </div>
      {gameIsOver && <WinScreen game={game} />}
    </>
  );
};

export default Play;
