import React, { useState } from "react";
import { ItemTypes } from "./Setup";
import { useDrag } from "react-dnd";
import { SHIP_IMAGES } from "../../Game/images";

const getShipSize = (type) => {
  const sizes = {
    carriers: 5,
    battleships: 4,
    cruisers: 3,
    submarines: 3,
    destroyers: 2,
  };

  return sizes[type];
};

const Ship = ({ type, isHorizontal, setNthCell }) => {
  const [dropped, setDropped] = useState(false);

  const size = getShipSize(type);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    item: {
      size,
      type,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) setDropped(true);
    },
  }));

  const getShipImage = (type, index) => {
    const imageArr = SHIP_IMAGES[type];
    return imageArr && imageArr[index];
  };

  return (
    <div
      className="DnDShip"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        display: dropped ? "none" : "flex",
        flexDirection: isHorizontal ? "column" : "row",
        margin: "10px",
      }}>
      {Array.from({ length: size }, (v, i) => (
        <div key={i} className="ShipPart" onMouseDown={() => setNthCell(i)}>
          <img
            className={!isHorizontal ? "horizontal" : ""}
            src={getShipImage(type, i)}
          />
        </div>
      ))}
    </div>
  );
};

export default Ship;
