import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DnDBoard from './DnDBoard';
import Ship from './Ship';

import './Setup.css';

export const ItemTypes = {
  SHIP: 'ship'
}

const Setup = props => {
  console.log("Setup component:", props);

  const [ draggedShipCell, setDraggedShipCell ] = useState(0);

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="Setup">
            <div className="ShipPool">
              <h2>Ships:</h2>
                <Ship size={5} />
            </div>
            <div className="board-area">
              <DnDBoard size={10} />
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
