import { Client } from "boardgame.io/react";
import Game from "./components/Game";
import Board from "./components/BattleshipBoards";

const App = Client({ game: Game, board: Board });

export default App;
