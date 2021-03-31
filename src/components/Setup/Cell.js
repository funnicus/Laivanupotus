import { ItemTypes } from "./Setup";
import { useDrop } from "react-dnd";

const Cell = ({
  x,
  y,
  squareText,
  isOuter,
  isHighlighted,
  canPlace,
  drawShip,
  dropShip,
  canDropShip,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.SHIP,
      drop: (item) => {
        dropShip(x, y, item);
      },
      hover: () => {
        //drawShip(x, y);
      },
      canDrop: (item) => canDropShip(x, y, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y]
  );

  const cellStyle = {
    width: "3rem",
    height: "3rem",
    backgroundColor: isHighlighted ? "#b2beb5" : "var(--primary)",
    textAlign: "center",
    border: "1px solid black",
    /*box-sizing because then borders wont make the cell bigger*/
    boxSizing: "border-box",
  };

  return (
    <div
      ref={isOuter ? null : drop}
      key={x + "" + y}
      style={cellStyle}
      x={x}
      y={y}>
      {squareText}
    </div>
  );
};

export default Cell;
