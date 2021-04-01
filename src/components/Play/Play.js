import { useEffect } from "react";
import { useSfx } from "../../util/useAudio";
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
    resetOnPlay: true,
  });

  const [playSunk] = useSfx({
    url: "./assets/ship_sunk.mp3",
    volume: 0.2,
    resetOnPlay: true,
  });

  // Play sound effects based on message changes
  useEffect(() => {
    let timeout;

    if (message.type === "nohit") return;
    if (message.type === "hit") playHit();
    if (message.type === "sunk") {
      playHit();
      timeout = setTimeout(playSunk, 1000); // 1s delay
    }

    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <>
      <div id="message">
        <h2>{message.text}</h2>
      </div>
      <div className="BattleshipBoards">
        <Board game={game} playerNum={0} />
        <Board game={game} playerNum={1} />
      </div>
    </>
  );
};

export default Play;
