const SIZE = 9;

const Game = {
  setup: () => ({ cells: Array(SIZE).fill(Array(SIZE).fill(null)) }),
  moves: {},
};

export default Game;
