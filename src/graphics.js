console.log("graphics");

const p1 = document.querySelector("#p1")
const p2 = document.querySelector("#p2")

const width = 11
const height = 11

const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

function createGrid(div) {
    for(let i = 0; i < width*height; i++){
        const square = document.createElement("div")
        div.appendChild(square)
        if(i < 11 && i !== 0){
            const p = document.createElement("p")
            square.appendChild(p)
            const index = i -1
            p.innerHTML = chars[index]
        }
        if(i % 11 === 0 && i !== 0){
            const p = document.createElement("p")
            square.appendChild(p)
            p.innerHTML = i/11
        }
    }
}

createGrid(p1)
createGrid(p2)

console.log(height)