import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DnDBoard from "./DnDBoard";
import Ship from "./Ship";

import "./Setup.css";

export const ItemTypes = {
  SHIP: "ship",
};

const Setup = (props) => {
  const { shipAmounts, boards } = props.G;
  const gridSize = boards[0].length + 1;

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

  const renderDraggableShips = () => {
    const shipArr = Object.keys(shipAmounts);

    const arr = [];

    for (const shipType of shipArr) {
      const amount = shipAmounts[shipType];

      for (let i = 0; i < amount; i++) {
        arr.push(
          <Ship
            type={shipType}
            isHorizontal={isHorizontal}
            setNthCell={setNthCell}
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
          <h2>
            Asetetaan laivoja pelaajalle {parseInt(props.ctx.currentPlayer) + 1}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: isHorizontal ? "row" : "column",
            }}
            className="ship-container">
            {renderDraggableShips()}
          </div>
          <div>
            <button
              className="confirm-button"
              onClick={() => props.moves.submitShips(ships)}
              disabled={ships.length < 4}>
              Vahvista laivojen sijainti!
            </button>
            <button className="confirm-button" onClick={() => props.undo()}>
              Aseta laivat uudelleen...
            </button>
          </div>
        </div>
        <div className="board-area">
          <DnDBoard
            size={gridSize}
            ships={ships}
            setShips={setShips}
            isHorizontal={isHorizontal}
            nthCell={nthCell}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Setup;
