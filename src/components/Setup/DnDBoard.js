const DnDBoard = ({ size }) => {
    const GRID_SIDE_SIZE = size;
    const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    const cellStyle = {
        width: "40px",
        height: "40px",
        backgroundColor: "#00d4ff",
        textAlign: "center",
        border: "1px solid black",
        /*box-sizing because then borders wont make the cell bigger*/
        boxSizing: "border-box"
    }
    const boardStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: `${40*(size)}px`,
        height: `${40*(size)}px`,
        backgroundColor: "black",
        margin: "20vh auto",
    }
  
    const createGrid = () => {
      const squares = [];
      for (let y = 0; y < GRID_SIDE_SIZE; y++) {
        const rows = [];
        for (let x = 0; x < GRID_SIDE_SIZE; x++) {
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
  
          // subtract 1 from x and y because of the extra cells on the left and top
          rows.push({ x: x - 1, y: y - 1, squareText, isOuter });
        }
        //dont push the first row, because it's not part of the game area
        squares.push(rows);
      }
      return squares;
    };

    return (
        <div className="DnDBoard" style={boardStyle}>
            {createGrid().map(row => {
                return row.map((cell, i) => {
                    return(
                    <div key={cell.x + "" + cell.y} style={cellStyle}>
                        {cell.squareText}
                    </div>
                    )
                })
            })}
        </div>
    )
}

export default DnDBoard;