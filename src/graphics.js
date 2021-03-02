console.log("graphics");

const p1 = document.querySelector("#p1")
const p2 = document.querySelector("#p2")

const width = 10
const height = 10

function createGrid(div) {
    for(let i = 0; i < width*height; i++){
        const square = document.createElement("div")
        div.appendChild(square)
    }
}

createGrid(p1)
createGrid(p2)

console.log(height)