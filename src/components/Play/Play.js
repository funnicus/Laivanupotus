import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const [showWinScreen, setShowWinScreen] = useState(false);

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
    let timeouts = [];

    switch (message.type) {
      default:
      case "nohit":
        return;

      case "hit":
        playHit();
        break;

      case "sunk":
        playHit();
        timeouts.push(setTimeout(playSunk, 1000));
        break;

      case "gameOver":
        playHit();
        timeouts.push(setTimeout(playSunk, 1000));
        timeouts.push(setTimeout(() => setShowWinScreen(true), 3000));
        playGameOver();
        break;
    }

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [message.type]);

  return (
    <>
      <Link to="/">
        <button title="Takaisin" className="back-button play">
          Lopeta peli
        </button>
      </Link>
      <div id="message">
        <h2>{!showWinScreen && message.text}</h2>
      </div>
      <div className="BattleshipBoards">
        <Board game={game} playerNum={0} />
        <Board game={game} playerNum={1} />
      </div>
      {showWinScreen && (
        <WinScreen game={game} setShowWinScreen={setShowWinScreen} />
      )}
    </>
  );
};

export default Play;
