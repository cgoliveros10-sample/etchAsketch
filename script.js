// Etch-a-Sketch Script
const grid = document.getElementById("grid");
const sizeButton = document.getElementById("size");
const modeButton = document.getElementById("mode");
const clearButton = document.getElementById("clear");

const maxGridSize = 100;
const darkenStep = 0.1;

let gridSize = 16;
let rainbowMode = false;

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `${red}, ${green}, ${blue}`;
}

function paintSquare(square) {
  const opacity = Math.min(1, Number(square.dataset.opacity) + darkenStep);
  square.dataset.opacity = opacity;

  if (!square.dataset.color || rainbowMode) {
    square.dataset.color = rainbowMode ? randomColor() : "0, 0, 0";
  }

  square.style.background = `rgba(${square.dataset.color}, ${opacity})`;
}

function createGrid() {
  grid.innerHTML = "";

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    const squareSize = 100 / gridSize;

    square.style.width = `${squareSize}%`;
    square.style.height = `${squareSize}%`;
    square.dataset.opacity = 0;

    square.addEventListener("mouseover", () => paintSquare(square));
    grid.appendChild(square);
  }
}

sizeButton.addEventListener("click", () => {
  const input = parseInt(prompt("Squares per side (max 100):", gridSize));

  if (isNaN(input)) return;

  if (input >= 1 && input <= maxGridSize) {
    gridSize = input;
    createGrid();
  } else {
    alert("Enter a number from 1 to 100.");
  }
});

modeButton.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  modeButton.textContent = `Mode: ${rainbowMode ? "Rainbow" : "Black"}`;
});

clearButton.addEventListener("click", createGrid);

createGrid();