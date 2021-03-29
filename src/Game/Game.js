import {
  placeShip,
  setBoardSize,
  setPlayerNames,
  setShipAmounts,
  shootAt,
} from "./moves";

export const DEFAULT_BOARD_SIZE = 9; // initial size of board
export const MAX_BOARD_SIZE = 10;
export const MIN_BOARD_SIZE = 5;

const Game = {
  /* Setup the empty game board */
  setup: (ctx) => {
    let boards = [];

    for (let i = 0; i < ctx.numPlayers; i++) {
      boards.push(
        Array(DEFAULT_BOARD_SIZE).fill(Array(DEFAULT_BOARD_SIZE).fill(null))
      );
    }

    return {
      boards,
      player1Name: "Pelaaja 1",
      player2Name: "Pelaaja 2",
      shipAmounts: {
        carriers: 0,
        battleships: 0,
        cruisers: 0,
        submarines: 0,
        destroyers: 0,
      },
    };
  },

  phases: {
    // players choose the game settings during this phase
    settings: {
      start: true, // start game at this phase
      next: "setup",
      moves: {
        setPlayerNames: setPlayerNames,
        setBoardSize: setBoardSize,
        setShipAmounts: setShipAmounts,
      },
    },

    // players place their ships during this phase
    setup: {
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
