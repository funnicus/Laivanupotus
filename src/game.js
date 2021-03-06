let height = 10;
let width = 10;
let ships = {};
let player1Ships = [];
let player2Ships = [];

/*
Carrier	= lentotukialus, pituus 5
Battleship = taistelulaiva, pituus 4
Cruiser = ristelijä, pituus 3
Submarine = sukellusvene, pituus 3
Destroyer = hävittäjä, pituus 2 */

/**
 * Function that sets the amount of different types of ships in the game
 * @param {number} carriers 
 * @param {number} battleships 
 * @param {number} cruisers 
 * @param {number} submarines 
 * @param {number} destroyers 
 */
function setShipAmounts(carriers, battleships, cruisers, submarines, destroyers) {
  ships = {
    carriers,
    battleships,
    cruisers,
    submarines,
    destroyers,
  };
}

/**
 * Function that checks whether the grid's area and the combined area of all of the ships are allowed
 * @param {number} gridHeight 
 * @param {number} gridWidth 
 */
function settingsOk(gridHeight, gridWidth) {
  const gridSize = gridHeight * gridWidth;
  const shipSize = ships.carriers * 5 + ships.battleships * 4 + ships.cruisers * 3 + ships.submarines * 3 + ships.destroyers * 2;
  return gridSize >= shipSize * 2;
}

/**
 * Function that sets a single 
 * @param {*} player 
 * @param {*} shipType 
 * @param {*} coords 
 */
function setShip(player, shipType, coords) {
  const ship = {
    x: coords.x,
    y: coords.y,
    dir: coords.dir,
    shipType,
  };
  if (player === 1) {
    Player1Ships.push(ship);
  } else if (player === 2) {
    player2Ships.push(ship);
  } else {
    throw new Error("Invalid player number");
  }
}