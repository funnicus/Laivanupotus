import React, { useState } from "react";
import { ItemTypes } from "./Setup";
import { useDrag } from "react-dnd";
import { SHIP_IMAGES } from "../../Game/images";

/**
 * Return a size corresponding to the type given as an function argument
 * @param {*} type
 * @returns {number}
 */
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

/**
 * Renders an individual ship for drag and drop
 * @param {Object} props
 * @returns {JSX.Element}
 */
const Ship = ({ type, isHorizontal, setNthCell, setIsDragging }) => {
  const [dropped, setDropped] = useState(false);

  const size = getShipSize(type);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SHIP,
    item: () => {
      setIsDragging(true);
      return {
        size,
        type,
      };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      setIsDragging(false);
      if (monitor.didDrop()) setDropped(true);
    },
  }));

  /**
   * Fetches the correct image for a geiven ship type
   * @param {*} type
   * @param {*} index
   * @returns
   */
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
