// Global variables
const gridContainer = document.getElementById("gridContainer");
const colorPickerInput = document.getElementById("currentColor");
const tools = document.getElementById("tools");


const GRID_ROWS = 46;
const GRID_COLS = 28;
const PIXEL_SIZE = 16;

let mouseDown = false;
let mouseOver = false;
let toolsObject = {
    rainbowfy: false,
    eraser: false,
    darkningEffect: false,
}

// Event listeners
document.addEventListener("mouseup", () => {
    mouseDown = false;
});

document.addEventListener("mouseleave", () => {
    mouseDown = false;
});

// Add an event listener to all the tools
Array.from(tools.children).forEach(child => {
    if (child.id.search("Tool") >= 0) {
        child.addEventListener("click", (e) => {
            toggleCurrentTool(e);
        });
    }
});

// Function that toggles a tool and deactives the other activated tools
function toggleCurrentTool(event) {
    var currentTool = event.currentTarget;

    if (currentTool.id === "rainbowTool") {
        changeToolState("rainbowfy", event);
    } else if (currentTool.id === "eraserTool") {
        changeToolState("eraser", event);
    } else if (currentTool.id === "blurTool") {
        changeToolState("darkningEffect", event);
    }
    console.log(toolsObject);
}

// Function to toggle between rainbowfy states
function changeToolState(state, event) {
    // Toggle states
    toolsObject[state] = (toolsObject[state]) ? false: true;

    // Deactivate other tools
    deactivateTools(state, "#a8a8a8");

    let backgroundColor = (toolsObject[state]) ? "#49bdf3" : "#a8a8a8";
    changeBackgroundColor(event.currentTarget, backgroundColor);
}

// Function to deactive all the other tools
function deactivateTools(state, color) {
    for (let tool in toolsObject) {
        if (tool !== state) {
            toolsObject[tool] = false;
        }
    }
    Array.from(tools.children).forEach(child => {
        if (child.id.search("Tool") >= 0) {
            changeBackgroundColor(child, color);
        }
    });
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
    changeBackgroundColor(event.currentTarget, color);
}

// Function that returns a random color
function getRandomColor(maxColorRange) {
    let red = Math.floor(Math.random() * maxColorRange);
    let green = Math.floor(Math.random() * maxColorRange);
    let blue = Math.floor(Math.random() * maxColorRange);
    return `rgb(${red}, ${green}, ${blue})`;
}

function changeBackgroundColor(element, color) {
    element.style.background = color;
}

console.log()

fillGrid(GRID_ROWS, GRID_COLS, PIXEL_SIZE);
