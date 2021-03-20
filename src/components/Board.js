const Board = props => {

  const GRID_SIDE_SIZE = 10;
  const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const boardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '440px',
    height: '440px',
  }

  const cellStyle = {
    border: '1px solid #555',
    width: '40px',
    height: '40px',
    textAlign: 'center',
  };

  const createGrid = () => {
    const squares = [];
    for (let i = 0; i < GRID_SIDE_SIZE; i++) {
      const rows = [];
      for (let j = 0; j < GRID_SIDE_SIZE; j++) {
        //id of the square is i-1 + j-1
        //-1, because we want to ignore the left ant top rows of the grid
        const squareId = (i - 1).toString() + (j - 1).toString();
        let squareText = "";
        //if we are on the first row, append characters from A to J inside the squares, depending on j
        if (i === 0 && j !== 0) {
          console.log("here")
          const index = j - 1;
          console.log(chars[index])
          squareText = chars[index];
        }
        //if we are the first square of the row, append the row number inside the square
        if (j === 0 && i !== 0) {
          squareText = `${i}`;
        }
        rows.push({ squareId, squareText });
      }
      //dont push the first row, because it's not part of the game area
      squares.push(rows);
    }
    return squares;
  }

  console.log(createGrid());

  return (
    <div className="Board" style={boardStyle}>
      {createGrid().map(row => {
        return row.map(column => {
          //console.log(column)
          return (
            <div key={column.squareId} style={cellStyle}>
              {column.squareText}
            </div>
            )
          })
        })}
    </div>
    );
};

export default Board;
