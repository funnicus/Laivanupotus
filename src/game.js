const height = prompt("Peliruudukon korkeus");
const width = prompt("Peliruudukon leveys");
const carrier = prompt("lentotukialusten määrä");
const battleship = prompt("taistelulaivojen määrä");
const cruiser = prompt("risteilijöiden määrä");
const submarine = prompt("sukellusveneiden määrä");
const destroyer = prompt("hävittäjien määrä");

/*
Carrier	= lentotukialus
Battleship = taistelulaiva
Cruiser = ristelijä
Submarine = sukellusvene
Destroyer = hävittäjä */

/*
Function that checks whether the grid's area and the combined area of all of the ships are allowed
*/
function settingsOk(gridHeight, gridWidth, carriers, battleships, cruisers, submarines, destroyers) {
  const gridSize = gridHeight * gridWidth;
  const shipSize = carriers * 5 + battleships * 4 + cruisers * 3 + submarines * 3 + destroyers * 2;
  return gridSize >= shipSize * 2;
}
