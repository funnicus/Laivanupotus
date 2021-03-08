const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
// ships
const ships = document.querySelectorAll(".ship");

// length of the ship that's being dragged
let shiplength = undefined;

let isVertical = true;
const GRID_SIDE_SIZE = 11;
const ship_area = (GRID_SIDE_SIZE - 1) / 2;
const r = document.querySelector(":root");
//set property of --grid-size to GRID_SIDE_SIZE*40px
r.style.setProperty("--grid-size", GRID_SIDE_SIZE * 40 + "px");

const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

/**
 * This class is used to create a grid with divs inside the
 * given constructor parameter element. I'm using a class,
 * because refering to the correct grid with the drop eventListener is
 * easier this way!
 */
class Grid {
  /**
   * @param {Element} div
   */
  constructor(div) {
    this.div = div;
    this.squares = [];
  }

  //method for creating the grid
  createGrid() {
    for (let i = 0; i < GRID_SIDE_SIZE; i++) {
      const rows = [];
      for (let j = 0; j < GRID_SIDE_SIZE; j++) {
        const square = document.createElement("div");
        //id of the square is i-1 + j-1
        //-1, because we want to ignore the left ant top rows of the grid
        square.id = (i - 1).toString() + (j - 1).toString();
        this.div.appendChild(square);
        //leaving the top left corner blank
        if (j === 0 && i === 0) continue;
        //if we are on the first row, append characters from A to J inside the squares, depending on j
        if (i === 0) {
          const p = document.createElement("p");
          square.appendChild(p);
          const index = j - 1;
          p.innerHTML = chars[index];
          continue;
        }
        //if we are the first square of the row, append the row number inside the square
        if (j === 0) {
          const p = document.createElement("p");
          square.appendChild(p);
          p.innerHTML = i;
          continue;
        }
        //event listeners for the square, for drag and drop operations
        square.addEventListener("dragenter", this.dragEnter);
        square.addEventListener("dragover", this.dragOver);
        square.addEventListener("dragleave", this.dragLeave);
        //we must bind this, so it refers to the object created using this class
        //otherwise this refers to the element, the eventListener callback belongs to!
        square.addEventListener("drop", this.drop.bind(this));
        //square.drop = square.drop.bind(this)
        rows.push(square);
      }
      //dont push the first row, because it's not part of the game area
      if (i === 0) continue;
      this.squares.push(rows);
    }
  }

  dragEnter(e) {
    if (!e.target.classList.contains("taken")) {
      e.preventDefault();
      e.target.classList.add("drag-over");
    }
  }

  dragOver(e) {
    if (!e.target.classList.contains("taken")) {
      e.preventDefault();
      e.target.classList.add("drag-over");
    }
  }

  dragLeave(e) {
    e.target.classList.remove("drag-over");
  }

  drop(e) {
    //getting the board x- and y -coordinates by parsing them from the target id
    const x = parseInt(e.target.getAttribute("id").substring(1, 2));
    const y = parseInt(e.target.getAttribute("id").substring(0, 1));

    // huoh, niin spagettia :-D
    const s = setShip(1, shiplength, { x, y, vertical: isVertical });
    if (!s) return;

    //is the ship vertical or horizontal?
    if (isVertical) {
      //for vertical edge check
      if (parseInt(e.target.getAttribute("id").substring(0, 1)) + shiplength > GRID_SIDE_SIZE - 1) {
        console.log("drop canceled: out of bounds");
        e.target.classList.remove("drag-over");
        return;
      }

      //"dropping" the ship
      let len = 0;
      while (len < shiplength) {
        this.squares[y + len][x].classList.add("taken");
        len++;
      }
    } else {
      //for horizontal edge check
      if (parseInt(e.target.getAttribute("id").substring(1, 2)) + shiplength > GRID_SIDE_SIZE - 1) {
        console.log("return");
        e.target.classList.remove("drag-over");
        return;
      }

      //"dropping" the ship
      let len = 0;
      while (len < shiplength) {
        this.squares[y][x + len].classList.add("taken");
        len++;
      }
    }

    e.target.classList.remove("drag-over");
  }
}

const grid1 = new Grid(p1);
const grid2 = new Grid(p2);

grid1.createGrid();
grid2.createGrid();

// attach the dragstart event handler
ships.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
});

// handle the dragstart
function dragStart(e) {
  //don't even ask why :/
  shiplength = (e.target.childNodes.length - 1) / 2;
}

function dragEnd(e) {
  setTimeout(() => {
    //e.target.classList.add('hide');
  }, 0);
}

/**
 * Function for changing ship alignment, when placing
 */
function changeShipAlignment() {
  isVertical = !isVertical;
  //const r = document.querySelector(':root');
  if (isVertical) {
    r.style.setProperty("--ship-container-layout", "row");
    r.style.setProperty("--ship-directions", "column");
  } else {
    r.style.setProperty("--ship-container-layout", "column");
    r.style.setProperty("--ship-directions", "row");
  }
}

//Listening to r-keypress, so we can rotate the ships
document.addEventListener("keydown", (e) => {
  if (e.code === "KeyR") {
    console.log("HERE");
    e.preventDefault();
    changeShipAlignment();
    return;
  }
});

console.log(grid1);
