import React, { useState } from 'react'
import { ItemTypes } from './Setup'
import { useDrag } from 'react-dnd'

const Ship = ({ size, isHorizontal }) => {

    const [ nthCell, setNthCell ] = useState(null);

    const cellNth = (i) => {
        setNthCell(i)
        console.log(nthCell)
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: {
            size
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    const shipCellStyle = {
        width: '40px',
        height: '40px',
        border: "1px solid black",
        boxSizing: "border-box",
        backgroundColor: "#b2beb5",
    }

    return (
        <div className="Ship"
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
            display: "flex",
            flexDirection: isHorizontal ? "column" : "row",
            margin: "10px"
        }}>
            {Array.from({length: size}, (v, i) => <div key={i} style={shipCellStyle} onMouseDown={() => cellNth(i)}></div>)}
        </div>
    );

}

export default Ship;