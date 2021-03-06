/**
 * Asettaa pelaajan 1 nimen
 * @param {string} name
 */
function setPlayer1Name(name) {}

/**
 * Asettaa pelaajan 2 nimen
 * @param {string} name
 */
function setPlayer2Name(name) {}

/**
 * Asettaa jokaisen laivan sallitut määrät.
 *
 * @param {number} carriers
 * @param {number} battleships
 * @param {number} cruisers
 * @param {number} submarines
 * @param {number} destroyers
 */
function setShipAmounts(
  carriers,
  battleships,
  cruisers,
  submarines,
  destroyers
) {}

/**
 * Tarkistaa mahtuuko annettu määrä laivoja kentälle.
 * Palauttaa true jos laivat mahtuvat, false jos laivoja on liikaa
 * width on ruudukon leveys, height ruudukon korkeus
 * ships on objekti, muoto on:
 * {
 *  carries: number,
 *  battleships: number,
 *  cruisers: number,
 *  submarines: number,
 *  destroyers: number
 * }
 * @param {number} width
 * @param {number} height
 * @param {object} ships
 */
function settingsOk(width, height, ships) {}

/**
 * Lisää laivan pelaajalle.
 * player on numero, joko 1 tai 2.
 * shipType on string, joko "carrier", "battleship", "cruiser", "submarine", "destroyer"
 * coords on objekti, muoto on:
 * {
 *  x: number,
 *  y: number,
 *  dir: string ("r", "u", "l" tai "d")
 * }
 * @param {number} player
 * @param {string} shipType
 * @param {object} coords
 */
function setShip(player, shipType, coords) {}

/**
 * Ampuu luodin annetun pelaajan laudalle annettuihin koordinaatteihin.
 * palauttaa 0 jos luoti ei osunut, 1 jos osui mutta laiva ei uponnut
 * ja 2 jos laiva upposi.
 *
 * player on numero, joko 1 tai 2
 * coords on objekti, muoto on:
 * {
 *  x: number,
 *  y: number,
 * }
 *
 * @param {number} player
 * @param {object} coords
 * @returns {number} osuman tyyppi
 */
function shootAt(player, coords) {}

/**
 * Palauttaa pelaajalla jäljellä olevien laivojen määrän.
 * player on numero, joko 1 tai 2
 * @param {number} player
 * @returns {number} jäljellä olevien laivojen määrä
 */
function shipsLeft(player) {}
