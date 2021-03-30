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
    const shipArr = Object.entries(shipAmounts);

    const items = shipArr.map(([type, amount]) => {
      const shipsOfType = [];

      for (let i = 0; i < amount; i++) {
        shipsOfType.push(
          <Ship
            type={type}
            isHorizontal={isHorizontal}
            setNthCell={setNthCell}
          />
        );
      }

      return shipsOfType;
    });

    return items.flat(1);
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
            <Ship
              type="carrier"
              isHorizontal={isHorizontal}
              setNthCell={setNthCell}
            />
            <Ship
              type="battleship"
              isHorizontal={isHorizontal}
              setNthCell={setNthCell}
            />
            <Ship
              type="cruiser"
              isHorizontal={isHorizontal}
              setNthCell={setNthCell}
            />
            <Ship
              type="submarine"
              isHorizontal={isHorizontal}
              setNthCell={setNthCell}
            />
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
