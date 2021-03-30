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
        rows.push({ x: x - 1, y: y - 1, squareText, isOuter, isHit });
      }
      //dont push the first row, because it's not part of the game area
      squares.push(rows);
    }
    return squares;
  };

  const getShipAtCoords = (cell) => {
    const { x, y } = cell;
    return ownShips.find((ship) =>
      ship.find((coords) => coords.x === x && coords.y === y)
    );
  };

  const renderShip = (cell) => {
    const ship = getShipAtCoords(cell);
    if (!ship) return null;

    const index = ship.findIndex(
      (coords) => coords.x === cell.x && coords.y === cell.y
    );

    return <img src={getShipImage(ship, index)} />;
  };

  return (
    <div className={`Board ${isOwnBoard ? "own" : ""}`} style={boardStyle}>
      {createGrid().map((row) => {
        return row.map((cell) => (
          <div
            className={`BoardCell ${cell.isOuter ? "outer" : ""} ${
              cell.isHit ? "clicked" : ""
            }`}
            key={cell.x + "" + cell.y}
            onClick={() =>
              !isOwnBoard &&
              game.moves.clickCell({ coords: cell, targetPlayer: playerNum })
            }>
            {cell.squareText}
            <div className="Ship">{isOwnBoard && renderShip(cell)}</div>
          </div>
        ));
      })}
    </div>
  );
};

export default Board;

const getShipImage = (ship, index) => {
  const imageArr = SHIP_IMAGES[ship[0].type];
  if (!imageArr) return null;

  return imageArr[index];
};

export const SHIP_IMAGES = {
  carrier: [
    "./image/Carrier front.png",
    "./image/Carrier middle1.png",
    "./image/Carrier middle2.png",
    "./image/Carrier middle3.png",
    "./image/Carrier back.png",
  ],
  battleship: [
    "./image/Battleship front.png",
    "./image/Battleship middle1.png",
    "./image/Battleship middle2.png",
    "./image/Battleship back.png",
  ],
  cruiser: [],
  submarine: [],
  destroyer: [],
};

/*
{
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

*/
