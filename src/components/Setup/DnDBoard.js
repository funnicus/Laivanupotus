import React, { useState, useEffect } from "react";
import Cell from "./Cell";

/**
 * Renders the board for drag and drop
 * @param {Object} props
 * @returns {JSX.Element}
 */
const DnDBoard = ({
  gridSize,
  ships,
  setShips,
  isHorizontal,
  nthCell,
  isDragging,
}) => {
  const [grid, setGrid] = useState([]);
  const [rerenders, setRerenders] = useState(0);

  const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const boardStyle = {
    display: "grid",
    width: "max-content",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    margin: "20vh auto",
    backgroundImage: "url('./image/ocean.png')",
  };

  useEffect(() => {
    setGrid(createGrid());
  }, [ships]);

  /**
   * Creates an array specifying the board that is to be rendered
   * @returns {Object[][]}
   */
  const createGrid = () => {
    const squares = [];
    for (let y = 0; y < gridSize; y++) {
      const rows = [];
      for (let x = 0; x < gridSize; x++) {
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

        rows.push({
          x,
          y,
          squareText,
          isOuter,
          isHighlighted: false,
          canPlace: true,
        });
      }
      squares.push(rows);
    }
    drawShipsOnBoard(squares);
    //cells won't receive updated grids without this!
    setRerenders(rerenders + 1);
    return squares;
  };

  /**
   * Draws ships on a given board
   * @param {Object[][]} board
   */
  const drawShipsOnBoard = (board) => {
    for (let i = 0; i < ships.length; i++) {
      const ship = ships[i];
      for (let j = 0; j < ship.coords.length; j++) {
        const coord = ship.coords[j];
        board[coord.y][coord.x].isHighlighted = true;

        board[coord.y][coord.x].ship = {
          type: coord.type,
          index: j,
          isHorizontal: coord.isHorizontal,
        };

        //setting the areas around ship, where other ships can't be placed
        board[coord.y][coord.x].canPlace = false;
        board[coord.y - 1][coord.x].canPlace = false;
        board[coord.y][coord.x - 1].canPlace = false;
        //without if checks, would throw errors when ship is placed besides board borders
        if (coord.y < gridSize - 1 && coord.x < gridSize - 1) {
          board[coord.y + 1][coord.x].canPlace = false;
          board[coord.y][coord.x + 1].canPlace = false;
        }
      }
    }
  };

  /**
   * Function handles ship placement
   * @param {number} x
   * @param {number} y
   * @param {Object} item
   * @returns {void}
   */
  const dropShip = (x, y, item) => {
    const { size, type } = item;
    const shipCoord = [];

    let start;

    if (isHorizontal) {
      start = y - nthCell;
      for (let i = start; i < start + size; i++) {
        shipCoord.push({ x: x, y: i, isHorizontal, type });
      }
    } else {
      start = x - nthCell;
      for (let i = start; i < start + size; i++) {
        shipCoord.push({ x: i, y, isHorizontal, type });
      }
    }

    const newShip = {
      hits: 0,
      type,
      isHorizontal,
      coords: shipCoord,
    };

    setShips((prev) => [...prev, newShip]);
  };

  return (
    <div className="DnDBoard" style={boardStyle} key={nthCell}>
      {grid.map((row) => {
        return row.map((cell) => {
          return (
            //avaimessa isHorizontal, jotta <Cell> uudelleen-renderöityy, kun kyseisen propsin arvo vaihtuu
            //cursed solution, i know :)
            <Cell
              key={cell.x + " " + cell.y + " " + isHorizontal + "" + rerenders}
              {...cell}
              grid={grid}
              isHorizontal={isHorizontal}
              nthCell={nthCell}
              GRID_SIDE_SIZE={gridSize}
              dropShip={dropShip}
              isDragging={isDragging}
            />
          );
        });
      })}
    </div>
  );
};

export default DnDBoard;
