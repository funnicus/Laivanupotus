import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DnDBoard from "./DnDBoard";
import Ship from "./Ship";

import "./Setup.css";

//react dnd ItemType for drag and drop
export const ItemTypes = {
  SHIP: "ship",
};

/**
 * Renders the setup screen
 * @param {Object} props
 * @returns {JSX.Element}
 */
const Setup = (props) => {
  const { shipAmounts, boards } = props.G;
  const gridSize = boards[0].length + 1;
  const totalShips = Object.values(shipAmounts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  /*
   * Variable for the name of the player whose ships are being setup
   */
  const playerName =
    props.ctx.currentPlayer === "0" ? props.G.player1Name : props.G.player2Name;

  const [isDragging, setIsDragging] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [nthCell, setNthCell] = useState(null);
  const [ships, setShips] = useState([]);

  useEffect(() => {
    function onDown(e) {
      e.preventDefault();
      if (e.key === "r" || e.key === "R") {
        setIsHorizontal((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onDown);
    return () => window.removeEventListener("keydown", onDown);
  }, []);

  /**
   * Creates an array containing Ship-components adn return them
   * @returns {JSX.Element[]}
   */
  const renderDraggableShips = () => {
    const shipArr = Object.keys(shipAmounts);

    const arr = [];

    for (const shipType of shipArr) {
      const amount = shipAmounts[shipType];

      for (let i = 0; i < amount; i++) {
        arr.push(
          <Ship
            key={shipType + i}
            type={shipType}
            isHorizontal={isHorizontal}
            setNthCell={setNthCell}
            setIsDragging={setIsDragging}
          />
        );
      }
    }

    return arr;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Setup">
        <div className="ShipPool">
          <h2>Asetetaan laivoja pelaajalle {playerName}</h2>
          <p>Voit kääntää laivoja painamalla r-näppäintä</p>
          <div
            style={{
              display: "flex",
              flexDirection: isHorizontal ? "row" : "column",
              flexWrap: "wrap",
            }}
            className="ship-container">
            {renderDraggableShips()}
          </div>
          <div>
            <button
              className="confirm-button"
              onClick={() => props.moves.submitShips(ships)}
              disabled={ships.length < totalShips}>
              Vahvista laivojen sijainti!
            </button>
            <button className="confirm-button" onClick={() => props.undo()}>
              Aseta laivat uudelleen...
            </button>
          </div>
        </div>
        <div className="board-area">
          <DnDBoard
            gridSize={gridSize}
            ships={ships}
            setShips={setShips}
            isHorizontal={isHorizontal}
            nthCell={nthCell}
            isDragging={isDragging}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Setup;
