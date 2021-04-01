import { useEffect, useRef } from 'react';
import { Client } from "boardgame.io/react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Game from "./Game/Game";
import GameRenderer from "./components/GameRenderer";
import Home from "./components/Home/Home";
import Help from "./components/Help/Help";
import Credits from "./components/Credits/Credits";
import "./Home.css";

/**
 * The app component renders everything
 * @returns {JSX.Element}
 */
const App = () => {
  const GameComponent = Client({
    game: Game,
    board: GameRenderer,
    numPlayers: 2,
  });

  const audioRef = useRef();

  //audio volume
  useEffect(() => {
    audioRef.current.volume = 0.05;
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/play">
            <GameComponent />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/credits">
            <Credits />
          </Route>
        </Switch>
      </BrowserRouter>
      <audio autoPlay ref={audioRef} loop src="./assets/battleship_music.mp3"></audio>
    </div>
  );
};

export default App;
