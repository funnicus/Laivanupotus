import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const DnDBoard = ({ size, ships, setShips, isHorizontal, nthCell }) => {

    const [ grid, setGrid ] = useState([]);

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
        console.log(grid)
    }, [ships])
  
    const createGrid = () => {
      console.log(ships.length)
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


    /**
     * Draws ships on a given board
     * @param {Array<Array<Object>>} board 
     */
    const drawShipsOnBoard = (board) => {
        for(let i = 0; i < ships.length; i++){
            for(let j = 0; j < ships[i].length; j++){
                if(!ships[i][j]) continue;
                const coord = ships[i][j];
                board[coord.y][coord.x].isHighlighted = true;
            }
        }
    }

    /**
     * May be obsolete...
     * @param {number} x 
     * @param {number} y 
     */
    const drawShip = (x, y) => {
        setGrid(prevGrid => {
            const newGrid = [ ...prevGrid ];
            for(let i = x; i < x+5; i++){
                newGrid[y][i].isHighlighted = true;
            }
            return newGrid;
        });
    }

    /**
     * Funktio käsittelee aluksen pudottamiseen liittyvät tapahtumat
     * @param {number} x 
     * @param {number} y 
     * @param {Object} item 
     * @returns {void}
     */
    const dropShip = (x, y, item) => {
        const { size } = item;
        const shipCoord = [];

        let start;

        if(isHorizontal){
            start = y-nthCell;
            if(start+size > GRID_SIDE_SIZE || start < 0) return;
            for(let i = start; i < start+size; i++){
                shipCoord.push({ x, y: i, isHorizontal });
            }
        }
        else {
            start = x-nthCell;
            if(start+size > GRID_SIDE_SIZE || start < 0) return;
            for(let i = start; i < start+size; i++){
                shipCoord.push({ x: i, y, isHorizontal });
            }
        }

        setShips(prev => [ ...prev, shipCoord ]);
    }

    const canDropShip = (x, y, item) => {
        const { size } = item;
        let start;
        if(isHorizontal){
            start = y-nthCell;
            if(start+size > GRID_SIDE_SIZE || start < 0) return false;
            for(let i = start; i < start+size; i++){
                if(i < 1 || i > GRID_SIDE_SIZE-1) return false;
                if(grid[i][x+1].isHighlighted || grid[i][x-1].isHighlighted || grid[i][x].isHighlighted) return false;
                if(i === start && grid[i-1][x].isHighlighted) return false;
            }
            return true;
        }
        else {
            start = x-nthCell;
            if(start+size > GRID_SIDE_SIZE || start < 0) return false;
            for(let i = start; i < start+size; i++){
                if(i < 1 || i > GRID_SIDE_SIZE-1) return false;
                if(grid[y+1][i].isHighlighted || grid[y-1][i].isHighlighted || grid[y][i].isHighlighted) return false;
                if(i === start && grid[x][i-1].isHighlighted) return false;
            }
            return true
        }
    }

    return (
        <div className="DnDBoard" style={boardStyle} key={nthCell}>
            {grid.map(row => {
                return row.map(cell => {
                    return(
                        //avaimessa isHorizontal, jotta <Cell> uudelleen-renderöityy, kun kyseisen propsin arvo vaihtuu
                        //cursed solution, i know :)
                        <Cell 
                            key={cell.x + " " + cell.y + " " + isHorizontal} 
                            {...cell} 
                            drawShip={drawShip} 
                            dropShip={dropShip} 
                            canDropShip={canDropShip} 
                        />
                    )
                })
            })}
        </div>
    )
}   

export default DnDBoard;