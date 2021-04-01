import { SHIP_IMAGES } from "../../Game/images";

const Board = ({ game, playerNum }) => {
  const isOwnBoard = parseInt(game.ctx.currentPlayer) === playerNum;

  const size = game.G.boards[playerNum].length + 1;
  const board = game.G.boards[playerNum];
  const ownShips = game.G[playerNum === 0 ? "shipsPlayer1" : "shipsPlayer2"];

  const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const boardStyle = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, max-content)`,
  };

  const createGrid = () => {
    const squares = [];
    for (let y = 0; y < size; y++) {
      const rows = [];
      for (let x = 0; x < size; x++) {
        let isOuter = x === 0 && y === 0; // top-left cell is automatically out

        let squareText = "";
        //if we are on the first row, append characters from A to J inside the squares, depending on j
        if (y === 0 && x !== 0) {
          const index = x - 1;
          squareText = chars[index];
          isOuter = true;
        }
        //if we are the first square of the row, append the row number inside the square
        if (x === 0 && y !== 0) {
          squareText = `${y}`;
          isOuter = true;
        }

        const isHit = !isOuter ? board[x - 1][y - 1] !== null : false;

        // subtract 1 from x and y because of the extra cells on the left and top
        rows.push({ x, y, squareText, isOuter, isHit });
      }
      //dont push the first row, because it's not part of the game area
      squares.push(rows);
    }
    return squares;
  };

  const getShipAtCoords = (cell) => {
    const { x, y } = cell;
    return ownShips.find((ship) =>
      ship.coords.find((coords) => coords.x === x && coords.y === y)
    );
  };

  const renderShip = (cell) => {
    const ship = getShipAtCoords(cell);
    if (!ship) return null;

    const index = ship.coords.findIndex(
      (c) => c.x === cell.x && c.y === cell.y
    );
    const isHorizontal = !ship.coords[0].isHorizontal; // huoh, isHorizontalia pitää käyttää näin päin koska spagetti muualla

    return (
      <img
        className={isHorizontal ? "horizontal" : ""}
        src={getShipImage(ship, index)}
      />
    );
  };

  const cellOnClick = (cell) => {
    if (isOwnBoard) return;
    game.moves.clickCell({
      coords: { x: cell.x - 1, y: cell.y - 1 },
      targetPlayer: playerNum,
    });
  };

  const cellClassName = (cell) => {
    const outer = cell.isOuter ? " outer" : "";
    const clicked = cell.isHit ? " clicked" : "";
    const hitShip = clicked && getShipAtCoords(cell) ? " hit" : "";

    return `BoardCell${outer}${clicked}${hitShip}`;
  };

  const getShipImage = (ship, index) => {
    const imageArr = SHIP_IMAGES[ship.coords[0].type];
    if (!imageArr) return null;

    return imageArr[index];
  };

  return (
    <div className={`Board ${isOwnBoard ? "own" : ""}`} style={boardStyle}>
      {createGrid().map((row) => {
        return row.map((cell) => (
          <div
            className={cellClassName(cell)}
            key={cell.x + "" + cell.y}
            onClick={() => cellOnClick(cell)}
          >
            <div className="OuterText">{cell.squareText}</div>
            <div className="Ship">{isOwnBoard && renderShip(cell)}</div>
          </div>
        ));
      })}
    </div>
  );
};

export default Board;
