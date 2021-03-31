import { TurnOrder } from "boardgame.io/core";

import {
  setBoardSize,
  setPlayerNames,
  setShipAmounts,
  shootAt,
  submitShips,
} from "./moves";

export const DEFAULT_BOARD_SIZE = 9; // initial size of board
export const MAX_BOARD_SIZE = 10;
export const MIN_BOARD_SIZE = 5;

/**
 * Creates two, two-dimensional arrays reprsenting the battleship boards
 * for game state. Called in setup.
 * @param {Object} ctx
 * @returns
 */
const createBoards = (ctx) => {
  let boards = [];

  for (let i = 0; i < ctx.numPlayers; i++) {
    const board = [];

    for (let j = 0; j < DEFAULT_BOARD_SIZE; j++) {
      board.push(Array(DEFAULT_BOARD_SIZE).fill(null));
    }

    boards.push(board);
  }

  return boards;
};

const Game = {
  // The name of the game.
  name: "Laivanupotus",

  /* Setup the empty game board */
  setup: (ctx) => {
    return {
      boards: createBoards(ctx),
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

  turn: {
    order: TurnOrder.RESET, // Reset to player 1 when phase changes
  },

  phases: {
    // players choose the game settings during this phase
    settings: {
      start: true, // start game at this phase
      next: "setup",
      moves: {
        setPlayerNames,
        setBoardSize,
        setShipAmounts,
      },
    },

    // players place their ships during this phase
    setup: {
      next: "play", // name of next phase
      moves: {
        submitShips,
        setBoardSize,
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
