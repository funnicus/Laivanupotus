import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DnDBoard from './DnDBoard';
import Ship from './Ship';

import './Setup.css';

export const ItemTypes = {
  SHIP: 'ship'
}

const Setup = props => {

  const [ isHorizontal, setIsHorizontal ] = useState(true);
  const [ nthCell, setNthCell ] = useState(null);
  const [ ships, setShips ] = useState([]); //[{x: 1, y: 2},{x: 1, y: 3},{x: 1, y: 4}],[{x: 3, y: 4}],[{x: 3, y: 3}]

  useEffect(() => {
    function onDown(e) {
      e.preventDefault();
      if (e.key === "r" || e.key === "R") {
        setIsHorizontal(prev => !prev);
      }
      console.log(isHorizontal)
    }
    window.addEventListener('keydown', onDown);
    return () => window.removeEventListener('keydown', onDown);
  }, []);

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="Setup">
            <div className="ShipPool">
              <h2>Asetetaan laivoja pelaajalle {parseInt(props.ctx.currentPlayer) + 1}</h2>
              <div style={{ display: "flex", flexDirection: isHorizontal ? "row" : "column" }} className="ship-container">
                <Ship size={5} isHorizontal={isHorizontal} setNthCell={setNthCell} />
                <Ship size={4} isHorizontal={isHorizontal} setNthCell={setNthCell} />
                <Ship size={3} isHorizontal={isHorizontal} setNthCell={setNthCell} />
                <Ship size={2} isHorizontal={isHorizontal} setNthCell={setNthCell} />
              </div>
              <div>
                <button className="confirm-button" onClick={() => props.moves.submitShips(ships)} disabled={ships.length < 4}>Vahvista laivojen sijainti!</button>
                <button className="confirm-button" onClick={() => props.undo()}>Aseta laivat uudelleen...</button>
              </div>
            </div>
            <div className="board-area">
              <DnDBoard size={10} ships={ships} setShips={setShips} isHorizontal={isHorizontal} nthCell={nthCell} />
            </div>
        </div>
      </DndProvider>
  );
};

export default Setup;

/*
const settings = {
  player1: "",
  player2: "",
  size: 5,
  ships: {
    battleships: 1,
    carriers: 1,
    submarines: 1,
    cruisers: 1,
    destroyers: 1,
  },
};
*/
