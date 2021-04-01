import { ItemTypes } from "./Setup";
import { useDrop } from "react-dnd";
import { getShipImage } from "../../Game/images";

/**
 * Renders an individual cell for the drag and drop board
 * @param {Object} props
 * @returns {JSX.Element}
 */
const Cell = ({ ship, x, y, squareText, isOuter, dropShip, canDropShip }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.SHIP,
      drop: (item) => {
        dropShip(x, y, item);
      },
      canDrop: (item) => canDropShip(x, y, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y]
  );

  return (
    <div
      ref={isOuter ? null : drop}
      key={x + "" + y}
      className={`DnDCell ${isOuter ? "outer" : ""}`}
      x={x}
      y={y}>
      {squareText}
      {ship && (
        <div className="DnDShip">
          <div className="ShipPart">
            <img
              className={!ship.isHorizontal ? "horizontal" : ""}
              src={getShipImage(ship.type, ship.index)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cell;
