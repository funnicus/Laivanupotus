const Board = ({ game, playerNum }) => {
  const isOwnBoard = parseInt(game.ctx.currentPlayer) === playerNum;

  const GRID_SIDE_SIZE = 10;
  const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const boardStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "440px",
    height: "440px",
  };

  const cellStyle = {
    border: "1px solid #555",
    width: "40px",
    height: "40px",
    textAlign: "center",
  };

  const createGrid = () => {
    const squares = [];
    for (let y = 0; y < GRID_SIDE_SIZE; y++) {
      const rows = [];
      for (let x = 0; x < GRID_SIDE_SIZE; x++) {
        let squareText = "";
        //if we are on the first row, append characters from A to J inside the squares, depending on j
        if (y === 0 && x !== 0) {
          const index = x - 1;
          squareText = chars[index];
        }
        //if we are the first square of the row, append the row number inside the square
        if (x === 0 && y !== 0) {
          squareText = `${y}`;
        }

        // subtract 1 from x and y because of the extra cells on the left and top
        rows.push({ x: x - 1, y: y - 1, squareText });
      }
      //dont push the first row, because it's not part of the game area
      squares.push(rows);
    }
    return squares;
  };

  return (
    <div className="Board" style={boardStyle}>
      {createGrid().map(row => {
        return row.map(cell => (
          <div
            key={cell.x + "" + cell.y}
            style={cellStyle}
            onClick={() => !isOwnBoard && game.moves.clickCell(cell)}>
            {cell.squareText}
          </div>
        ));
      })}
    </div>
  );
};

export default Board;
