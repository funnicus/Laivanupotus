let height = 10;
let width = 10;
let shipAmounts = {};
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
  shipAmounts = {
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
  const shipSize = shipAmounts.carriers * 5 + shipAmounts.battleships * 4 + shipAmounts.cruisers * 3 + shipAmounts.submarines * 3 + shipAmounts.destroyers * 2;
  return gridSize >= shipSize * 2;
}

/**
 * Function that adds a single ship to the player
 * @param {number} player
 * @param {string} type
 * @param {object} coords
 */
function setShip(player, type, coords) {
  const shipCoords = [];

  for (let i = 0; i < shipLength(type); i++) {
    const x = coords.vertical ? coords.x : coords.x + i;
    const y = coords.vertical ? coords.y + i : coords.y;

    shipCoords.push({ x, y });
  }

  const ship = {
    coords: shipCoords,
    type,
    hits: 0,
  };
  if (player === 1) {
    player1Ships.push(ship);
  } else if (player === 2) {
    player2Ships.push(ship);
  } else {
    throw new Error("Invalid player number");
  }

  return ship;
}

/**
 * Shoots at the given coordinates on the board of the given player
 *
 * returns:
 * 0, if didn't hit
 * 1, if hit but didn't sink
 * 2, if sank a ship
 *
 * @param {number} player
 * @param {object} coords
 * @returns {number} osuman tyyppi
 */
function shootAt(player, coords) {
  const ship = getShipAtCoords(player, coords);
  if (!ship) return 0;

  ship.hits += 1;

  if (ship.hits < shipLength(ship.type)) {
    return 1;
  } else if (ship.hits === shipLength(ship.type)) {
    return 2;
  } else {
    throw new Error("Oh no! The ship should've sank already or there is something else funny in the code.");
  }
}

/**
 * Checks if the coordinates are inside a ship.
 * @param {object} ship
 * @param {object} coords
 * @param {string} type
 */
function getShipAtCoords(player, coords) {
  const shipArr = player === 1 ? player1Ships : player2Ships;

  for (const s of shipArr) {
    for (const shipCoords of s.coords) {
      if (coords.x === shipCoords.x && coords.y === shipCoords.y) return s;
    }
  }

  return null;
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
