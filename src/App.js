import { Client } from "boardgame.io/react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Game from "./components/Game/Game";
import GameRenderer from "./components/GameRenderer";

const App = () => {
  const GameComponent = Client({ game: Game, board: GameRenderer });

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <h1>hello</h1>
          </Route>
          <Route path="/play">
            <GameComponent />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
