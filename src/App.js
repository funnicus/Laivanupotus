import { Client } from "boardgame.io/react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Game from "./components/Game/Game";
import GameRenderer from "./components/GameRenderer";
import Home from "./components/Home/Home";
import Help from "./components/Help/Help";
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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
