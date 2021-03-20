import { placeShip, shootAt } from "./moves";

const SIZE = 9; // size of board

const Game = {
  /* Setup the empty game board */
  setup: () => ({
    cells: Array(SIZE).fill(Array(SIZE).fill(null)),
  }),

  phases: {
    // players place their ships during this phase
    setup: {
      start: true, // start game at this phase
      next: "play", // name of next phase
      moves: {
        clickCell: placeShip,
      },
    },

    // players fight during this phase
    play: {
      moves: {
        clickCell: shootAt,
      },
    },
  },

  /* Checks if the game should end */
  endIf: (G, ctx) => {
    // TODO: tarkista onko peli loppunut
  },
};

export default Game;
