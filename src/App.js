import { Client } from "boardgame.io/react";
import Game from "./components/Game/Game";
import GameRenderer from "./components/GameRenderer";

const App = Client({ game: Game, board: GameRenderer });

export default App;
