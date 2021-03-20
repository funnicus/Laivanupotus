import { INVALID_MOVE } from "boardgame.io/core";

/**
 * Returns true if coordinates are inside the game board
 * @param {*} G
 * @param {*} coords
 * @returns
 */
const isInsideBounds = (G, coords) => {
  const { x, y } = coords;

  if (x < 0 || x >= G.cells.length || y < 0 || y >= G.cells[x].length) {
    return false;
  }

  return true;
};

/**
 * Called when a player clicks on a cell during the 'setup' phase
 * @param {*} G
 * @param {*} ctx
 * @param {*} opts
 */
export const placeShip = (G, ctx, opts) => {
  console.log("place ship:", opts);
};

/**
 * Called when a player clicks on a cell during the 'play' phase.
 * @param {*} G
 * @param {*} ctx
 * @param {*} coords
 * @returns
 */
export const shootAt = (G, ctx, coords) => {
  if (!isInsideBounds(G, coords)) return INVALID_MOVE;

  const { x, y } = coords;
  const cell = G.cells[x][y];

  // do stuff with the cell

  console.log("shootAt:", coords, cell);

  ctx.events.endTurn();
};
