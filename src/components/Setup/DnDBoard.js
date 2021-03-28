import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const DnDBoard = ({ size }) => {

    const [ grid, setGrid ] = useState([]);
    const [ ships, setShips ] = useState([[{x: 1, y: 2},{x: 1, y: 3},{x: 1, y: 4}],[{x: 3, y: 4}],[{x: 3, y: 3}]]);

    const GRID_SIDE_SIZE = size;
    const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    const boardStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: `${40*(size)}px`,
        height: `${40*(size)}px`,
        backgroundColor: "black",
        margin: "20vh auto",
    }

    useEffect(() => {
        setGrid(createGrid())
    }, [ships])
  
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
          rows.push({ x, y, squareText, isOuter, isHighlighted: false });
        }
        //dont push the first row, because it's not part of the game area
        squares.push(rows);
      }
      drawShipsOnBoard(squares);
      return squares;
    };

    const drawShipsOnBoard = (board) => {
        for(let i = 0; i < ships.length; i++){
            for(let j = 0; j < ships[i].length; j++){
                if(!ships[i][j]) return;
                const coord = ships[i][j];
                board[coord.y][coord.x].isHighlighted = true;
            }
        }
    }

    const drawShip = (x, y) => {
        const newGrid = createGrid();
        for(let i = x; i < x+5; i++){
            newGrid[y][i].isHighlighted = true;
        }
        setGrid(newGrid);
    }

    const dropShip = (x, y) => {
        const shipCoord = [];
        for(let i = x; i < x+5; i++){
            shipCoord.push({ x: i, y });
        }

        const newShips = ships.concat(shipCoord);
        setShips(newShips);
        console.log("Laivat: " + ships)
    }

    return (
        <div className="DnDBoard" style={boardStyle}>
            {grid.map(row => {
                return row.map(cell => {
                    return(
                        <Cell key={cell.x + " " + cell.y} {...cell} drawShip={drawShip} dropShip={dropShip} />
                    )
                })
            })}
        </div>
    )
}

export default DnDBoard;