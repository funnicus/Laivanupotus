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
 * Function that adds a single ship to the player
 * @param {number} player
 * @param {string} type
 * @param {object} coords
 */
function setShip(player, type, coords) {
  const ship = {
    x: coords.x,
    y: coords.y,
    dir: coords.dir,
    type,
    hits: 0,
  };
  if (player === 1) {
    Player1Ships.push(ship);
  } else if (player === 2) {
    player2Ships.push(ship);
  } else {
    throw new Error("Invalid player number");
  }
}

/**
 * Checks if the coordinates are inside a ship
 * @param {object} ship
 * @param {object} hitCoords
 * @param {string} type
 */
function areCoordsOnShip(ship, hitCoords, type) {
  let currX = ship.x;
  let currY = ship.y;

  const l = shipLength(type);

  for (let i = 0; i < l; i++) {
    switch (ship.dir) {
      case "l":
        currX -= 1;
        break;
      case "r":
        currX += 1;
        break;
      case "u":
        currY -= 1;
        break;
      case "d":
        currY += 1;
        break;
    }

    if (currX === hitCoords.x && currY === hitCoords.y) return true;
  }

  return false;
}

/**
 * Returns the length of the given ship type
 * @param {*} type
 * @returns
 */
function shipLength(type) {
  const sizes = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  return sizes[type];
}
