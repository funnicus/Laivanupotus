import { ItemTypes } from "./Setup";
import { useDrop } from "react-dnd";
import { getShipImage } from "../../Game/images";

/**
 * Renders an individual cell for the drag and drop board
 * @param {Object} props
 * @returns {JSX.Element}
 */
const Cell = ({ 
  ship, 
  x, 
  y, 
  squareText, 
  isOuter, 
  grid, 
  isHorizontal, 
  nthCell, 
  GRID_SIDE_SIZE, 
  dropShip 
}) => {

  /**
   * Checks if ship can be dropped on target
   * @param {number} x
   * @param {number} y
   * @param {Object} item
   * @returns
   */
   const canDropShip = (x, y, item) => {

    const { size } = item;
    let start;

    if (isHorizontal) {
      start = y - nthCell;

      if (start + size > GRID_SIDE_SIZE || start < 1) return false;

      for (let i = start; i < start + size; i++) {
        if (!grid[i][x].canPlace) return false;
      }

      return true;
    } else {
      start = x - nthCell;

      if (start + size > GRID_SIDE_SIZE || start < 1) return false;

      for (let i = start; i < start + size; i++) {
        if (!grid[y][i].canPlace) return false;
      }

      return true;
    }
  };

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

  const cellStyle = {
    display: "grid",
    placeContent: "center",
    width: "3rem",
    height: "3rem",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.2)",
    /*box-sizing because then borders wont make the cell bigger*/
    boxSizing: "border-box",
  };

  return (
    <div
      ref={isOuter ? null : drop}
      key={x + "" + y + grid}
      style={cellStyle}
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
