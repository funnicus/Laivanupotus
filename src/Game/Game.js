import { placeShip, setBoardSize, shootAt } from "./moves";

export const DEFAULT_BOARD_SIZE = 9; // initial size of board
export const MAX_BOARD_SIZE = 10;
export const MIN_BOARD_SIZE = 5;

const Game = {
  /* Setup the empty game board */
  setup: ctx => {
    let boards = [];

    for (let i = 0; i < ctx.numPlayers; i++) {
      boards.push(
        Array(DEFAULT_BOARD_SIZE).fill(Array(DEFAULT_BOARD_SIZE).fill(null))
      );
    }

    boards[0][1][3] = {
      type: "carrier",
      dir: "r",
      imageIndex: 0,
      isHit: false,
    };

    return {
      boards,
    };
  },

  phases: {
    // players place their ships during this phase
    setup: {
      start: true, // start game at this phase
      next: "play", // name of next phase
      moves: {
        clickCell: placeShip,
        setBoardSize: setBoardSize,
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
