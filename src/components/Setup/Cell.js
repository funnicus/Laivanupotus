import { useEffect } from 'react';
import { ItemTypes } from './Setup';
import { useDrop } from 'react-dnd';

const Cell = ({ x, y, squareText, isOuter, isHighlighted, drawShip, dropShip }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.SHIP,
        drop: () => {
            dropShip(x, y);
        },
        hover: () => {
            drawShip(x, y);
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
    }), [x, y])

    const cellStyle = {
        width: "40px",
        height: "40px",
        backgroundColor: isOver || isHighlighted ? "#b2beb5" : "#00d4ff",
        textAlign: "center",
        border: "1px solid black",
        /*box-sizing because then borders wont make the cell bigger*/
        boxSizing: "border-box"
    }

    return(
        <div ref={isOuter ? null : drop} key={x + "" + y} style={cellStyle} x={x} y={y}>
            {squareText}
        </div>
    )
}

export default Cell;