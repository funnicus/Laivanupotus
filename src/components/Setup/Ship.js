import React from 'react'
import { ItemTypes } from './Setup'
import { useDrag } from 'react-dnd'

const Ship = ({ size }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
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

    //console.log(Array.from(size, (v, i) => <div key={i} style={shipCellStyle}></div>));
    console.log()

    return (
        <div className="Ship"
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
            display: "flex",
        }}>
            {Array.from({length: 5}, (v, i) => <div key={i} style={shipCellStyle}></div>)}
        </div>
    );

}

export default Ship;