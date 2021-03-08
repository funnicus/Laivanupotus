const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
// ships
const ships = document.querySelectorAll('.ship');

const isVertical = true;
const GRID_SIDE_SIZE = 11;
const ship_area = (GRID_SIDE_SIZE-1)/2;
const r = document.querySelector(':root');
//set property of --grid-size to GRID_SIDE_SIZE*40px
r.style.setProperty("--grid-size", GRID_SIDE_SIZE*40 + "px");

const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

/**
 * This function creates a grid with divs inside the 
 * given function parameter element
 * @param {Element} div 
 */
function createGrid(div) {
    this.grid = undefined;
    const squares = [];
    for(let i = 0; i < GRID_SIDE_SIZE; i++){
        const rows = []
        for(let j = 0; j < GRID_SIDE_SIZE; j++){
            const square = document.createElement("div");
            //id of the square is i-1 + j-1
            //-1, because we want to ignore the left ant top rows of the grid
            square.id = (i-1).toString() + (j-1).toString();
            div.appendChild(square)
            //leaving the top left corner blank
            if(j === 0 && i === 0) continue;
            //if we are on the first row, append characters from A to J inside the squares, depending on j
            if(i === 0){
                const p = document.createElement("p");
                square.appendChild(p);
                const index = j-1;
                p.innerHTML = chars[index];
                continue;
            }
            //if we are the first square of the row, append the row number inside the square
            if(j === 0){
                const p = document.createElement("p")
                square.appendChild(p);
                p.innerHTML = i;
                continue;
            }
            //event listeners for the square, for drag and drop operations
            square.addEventListener('dragenter', dragEnter);
            square.addEventListener('dragover', dragOver);
            square.addEventListener('dragleave', dragLeave);
            square.addEventListener('drop', drop);
            rows.push(square)
        }
        //dont push the first row, because it's not part of the game area
        if(i === 0) continue;
        squares.push(rows);
    }

    this.grid = squares;

    function dragEnter(e){
        if(!e.target.classList.contains("taken")){
            e.preventDefault();
            e.target.classList.add('drag-over');
        }
    }
    
    function dragOver(e) {
        if(!e.target.classList.contains("taken")){
            e.preventDefault();
            e.target.classList.add('drag-over');
        }
    }
    
    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }
    
    function drop(e){
    
        //console.log(parseInt(e.target.getAttribute("id")))
        const x = parseInt(e.target.getAttribute("id").substring(0,1))
        const y = parseInt(e.target.getAttribute("id").substring(1,2))
    
        console.log(x + ', ' + y)
    
        if(isVertical){
            //for vertical edge check
            if(parseInt(e.target.getAttribute("id").substring(0,1)) + shiplength > GRID_SIDE_SIZE-1) {
                console.log("return")
                return
            };
    
            grid[x][y].classList.add("taken")
    
            console.log("dropped...")
            e.target.classList.remove('drag-over');
            //e.target.classList.add("taken")
            //const id = e.dataTransfer.getData('text/plain');
            //const draggable = document.getElementById(id);
            //e.target.appendChild(draggable)
            console.log(e.target)
        }
        else {
    
        }
    }
    return squares;
}

const grid1 = createGrid(p1)
const grid2 = createGrid(p2)
let shiplength = undefined;

// attach the dragstart event handler
ships.forEach(ship => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
});

// handle the dragstart
function dragStart(e) {
   //console.log('drag starts...');
   //console.log(e.target)
   //don't even ask why :/
   shiplength = (e.target.childNodes.length-1)/2
   //console.log(shiplength)
   //e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnd(e) {
    setTimeout(() => {
        //e.target.classList.add('hide');
    }, 0);
}



console.log(grid1)