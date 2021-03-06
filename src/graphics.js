const p1 = document.querySelector("#p1")
const p2 = document.querySelector("#p2")
// ships
const ships = document.querySelectorAll('.ship');

const GRID_SIDE_SIZE = 11
const r = document.querySelector(':root');
// Get the styles (properties and values) for the root
const rs = getComputedStyle(r);
// Alert the value of the --blue variable
r.style.setProperty("--grid-size", GRID_SIDE_SIZE*40 + "px");

const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]


/**
 * This function creates a grid with divs inside the 
 * given function parameter element
 * @param {Element} div 
 */
function createGrid(div) {
    for(let i = 0; i < GRID_SIDE_SIZE*GRID_SIDE_SIZE; i++){
        const square = document.createElement("div")
        div.appendChild(square)
        if(i === 0) continue;
        if(i < GRID_SIDE_SIZE){
            const p = document.createElement("p")
            square.appendChild(p)
            const index = i -1
            p.innerHTML = chars[index]
            continue;
        }
        if(i % GRID_SIDE_SIZE === 0 && i !== 0){
            const p = document.createElement("p")
            square.appendChild(p)
            p.innerHTML = i/GRID_SIDE_SIZE
            continue;
        }
        square.addEventListener('dragenter', dragEnter);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', drop);
    }
}

// attach the dragstart event handler
ships.forEach(ship => {
    ship.addEventListener('dragstart', dragStart);
});

// handle the dragstart
function dragStart(e) {
   console.log('drag starts...');
   e.dataTransfer.setData('text/plain', e.target.id);
   setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnter(e){
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e){
    console.log("dropped...")
    e.target.classList.remove('drag-over');
    //e.dataTransfer
}


createGrid(p1)
createGrid(p2)

console.log(ships)