import { Client } from "boardgame.io/react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Game from "./Game/Game";
import GameRenderer from "./components/GameRenderer";
import Home from "./components/Home/Home";
import Help from "./components/Help/Help";
import Credits from "./components/Credits/Credits";
import "./Home.css";

const App = () => {
  const GameComponent = Client({ game: Game, board: GameRenderer });

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
    </div>
  );
};

export default App;
