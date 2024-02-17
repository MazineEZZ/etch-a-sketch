// Global variables
const gridContainer = document.getElementById("gridContainer");
const colorPickerInput = document.getElementById("currentColor");
const rainbowTool = document.getElementById("rainbowTool");

const GRID_ROWS = 46;
const GRID_COLS = 28;
const PIXEL_SIZE = 16;

let mouseDown = false;
let mouseOver = false;
let rainbowfy = false;

// Event listeners
document.addEventListener("mouseup", () => {
    mouseDown = false;
});

document.addEventListener("mouseleave", () => {
    mouseDown = false;
});

rainbowTool.addEventListener("click", (e) => {
    toggleRainbowTool(e);
});

// Function to toggle between rainbowfy states
function toggleRainbowTool(event) {
    rainbowfy = (rainbowfy) ? false : true;
    event.currentTarget.style.backgroundColor = (rainbowfy) ? "#49bdf3" : "#a8a8a8";
}

// Function to fill the grid with pixels
function fillGrid(rows, cols, size) {
    for (let row = 0; row < rows; row++) {
        let pixelContainer = document.createElement("div");
        pixelContainer.classList.add("pixel-container");

        for (let col = 0; col < cols; col++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            // Adjust each pixels
            pixel.style.width = `${size}px`;
            pixel.style.height = `${size}px`;

            pixel.addEventListener("mouseover", (e) => {
                if (mouseDown) {
                    changePixelColor(e);
                }
            });

            pixel.addEventListener("mousedown", (e) => {
                mouseDown = true;
                changePixelColor(e);
            });

            pixelContainer.appendChild(pixel);
        }
        gridContainer.appendChild(pixelContainer);
    }
}

// Function to change the color of a pixel
function changePixelColor(event) {
    if (rainbowfy) {
        var color = getRandomColor(210)
    } else {
        var color = colorPickerInput.value;
    }
    event.target.style.background = color;
}

// Function that returns a random color
function getRandomColor(maxColorRange) {
    let red = Math.floor(Math.random() * maxColorRange);
    let green = Math.floor(Math.random() * maxColorRange);
    let blue = Math.floor(Math.random() * maxColorRange);
    return `rgb(${red}, ${green}, ${blue})`;
}

console.log()

fillGrid(GRID_ROWS, GRID_COLS, PIXEL_SIZE);
