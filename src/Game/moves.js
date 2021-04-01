import { INVALID_MOVE } from "boardgame.io/core";
import { createBoards, MAX_BOARD_SIZE, MIN_BOARD_SIZE } from "./Game";

/**
 * Function that sets the player names in the game.
 * @param {Object} G used by boardgame.io, represents game state
 * @param {Object} ctx used by boardgame.io, represents game metadata
 * @param {Number} playerNum  number of the player whose name is being set
 * @param {String} playerName name that is being set for the player
 */
export const setPlayerNames = (G, ctx, playerNum, playerName) => {
  if (playerNum === 1) {
    G.player1Name = playerName || "Pelaaja 1";
  } else if (playerNum === 2) {
    G.player2Name = playerName || "Pelaaja 2";
  }
};

/**
 * Function that sets the board size.
 * @param {Object} G used by boardgame.io, represents game state
 * @param {Object} ctx used by boardgame.io, represents game metadata
 * @param {Number} size size that is being set for the board
 * @returns INVALID_MOVE (boardgame.io's way of invalidating a move) if the size is not allowed
 */
export const setBoardSize = (G, ctx, size) => {
  if (typeof size !== "number") return INVALID_MOVE;
  if (size < MIN_BOARD_SIZE || size > MAX_BOARD_SIZE) return INVALID_MOVE;

  for (let i = 0; i < G.boards.length; i++) {
    G.boards[i] = Array(size).fill(Array(size).fill(null));
  }
};

/**
 * Function that sets the ship amounts.
 * This function also checks the validity of the ship amounts, even though the validity is also checked in
 * the Settings.js file. The criteria for valid ship amounts is documented in said file.
 * The validity is checked twice for extra security.
 * @param {Object} G used by boardgame.io, represents game state
 * @param {Object} ctx used by boardgame.io, represents game metadata
 * @param {Object} shipAmounts that contains key-value-pairs for each ship type
 * @returns INVALID_MOVE if the ship amounts are not valid
 */
export const setShipAmounts = (G, ctx, shipAmounts) => {
  const size = G.boards[0][0].length;

  // Checking whether the ship amounts are valid
  if (
    shipAmounts.carriers * 5 +
      shipAmounts.battleships * 4 +
      shipAmounts.cruisers * 3 +
      shipAmounts.submarines * 3 +
      shipAmounts.destroyers * 2 >
    (size * size) / 2
  )
    return INVALID_MOVE;

  if (
    shipAmounts.carriers < 0 ||
    shipAmounts.battleships < 0 ||
    shipAmounts.cruisers < 0 ||
    shipAmounts.submarines < 0 ||
    shipAmounts.destroyers < 0
  )
    return INVALID_MOVE;

  // Setting the ship values once it has been checked that they are valid
  G.shipAmounts.carriers = shipAmounts.carriers;
  G.shipAmounts.battleships = shipAmounts.battleships;
  G.shipAmounts.cruisers = shipAmounts.cruisers;
  G.shipAmounts.submarines = shipAmounts.submarines;
  G.shipAmounts.destroyers = shipAmounts.destroyers;
};

/**
 * Called when placed ships for a player are submitted
 */
export const submitShips = (G, ctx, ships) => {
  if (ctx.currentPlayer === "0") {
    G.shipsPlayer1 = ships;
    ctx.events.endTurn();
  } else {
    G.shipsPlayer2 = ships;
    ctx.events.endPhase();
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
 * Called when a player clicks on a cell during the 'play' phase.
 */
export const shootAt = (G, ctx, { coords, targetPlayer }) => {
  if (!isInsideBounds(G, coords, targetPlayer)) return INVALID_MOVE;

  const { x, y } = coords;
  const board = G.boards[targetPlayer];
  const targetsShips = targetPlayer == 0 ? G.shipsPlayer1 : G.shipsPlayer2;
  const targetName = targetPlayer == 0 ? G.player1Name : G.player2Name;

  if (board[x][y] !== null) return INVALID_MOVE;
  board[x][y] = true;

  const shipHit = targetsShips.find((ship) =>
    ship.coords.find((coords) => coords.x - 1 === x && coords.y - 1 === y)
  );

  if (shipHit) {
    shipHit.hits += 1;
    if (shipHit.hits == shipHit.coords.length) {
      G.message.type = "sunk";
      G.message.text = `Upotit pelaajan ${targetName} laivan`;
      targetPlayer == 0 ? G.sunkShipsP1++ : G.sunkShipsP2++;
      if (G.sunkShipsP1 === targetsShips.length) {
        G.message.text = `${G.player2Name} voitti pelin!`;
        G.message.type = "gameOver";
      }
      if (G.sunkShipsP2 === targetsShips.length) {
        G.message.text = `${G.player1Name} voitti pelin!`;
        G.message.type = "gameOver";
      }
    } else {
      G.message.type = "hit";
      G.message.text = `Osuit pelaajan ${targetName} laivaan`;
    }
  } else {
    G.message.type = "nohit";
    G.message.text = "";
    ctx.events.endTurn();
  }
};

export const resetGame = (G, ctx) => {
  G.boards = createBoards(ctx);
  G.shipsPlayer1 = [];
  G.shipsPlayer2 = [];
  G.sunkShipsP1 = 0;
  G.sunkShipsP2 = 0;
  G.message.text = "";
  G.message.type = "nohit";
  ctx.events.setPhase("settings");
};
