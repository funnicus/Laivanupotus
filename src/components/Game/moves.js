import { INVALID_MOVE } from "boardgame.io/core";
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from "./Game";

/**
 * Updates the size of the game boards
 */
export const setBoardSize = (G, ctx, size) => {
  if (typeof size !== "number") return INVALID_MOVE;
  if (size < MIN_BOARD_SIZE || size > MAX_BOARD_SIZE) return INVALID_MOVE;

  for (let i = 0; i < G.boards.length; i++) {
    G.boards[i] = Array(size).fill(Array(size).fill(null));
  }
};

/**
 * Returns true if coordinates are inside the game board
 */
const isInsideBounds = (G, coords, playerNum) => {
  const { x, y } = coords;

  if (x < 0 || x >= G.boards[playerNum].length) return false;
  if (y < 0 || y >= G.boards[playerNum][x].length) return false;

  return true;
};

/**
 * Called when a player clicks on a cell during the 'setup' phase
 */
export const placeShip = (G, ctx, opts) => {
  console.log("place ship:", opts);
};

/**
 * Called when a player clicks on a cell during the 'play' phase.
 */
export const shootAt = (G, ctx, { coords, targetPlayer }) => {
  if (!isInsideBounds(G, coords, targetPlayer)) return INVALID_MOVE;

  const { x, y } = coords;
  const board = G.boards[targetPlayer];

  if (board[x][y] !== null) return INVALID_MOVE;
  board[x][y] = true;

  ctx.events.endTurn();
};
