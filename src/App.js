import { Client } from "boardgame.io/react";
import Game from "./components/Game";
import Board from "./components/Board";

const App = Client({ game: Game, board: Board });

export default App;
