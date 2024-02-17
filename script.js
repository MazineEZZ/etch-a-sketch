// Global variables
const canvasContainer = document.getElementById("canvasContainer");
const colorPickerInput = document.getElementById("currentColor");
const tools = document.getElementById("tools");
const changeGridBtn = document.getElementById("gridBtn");
const modal = document.getElementById("modal");
const submitModalBtn = document.getElementById("submitModal");
const gridSelector = document.getElementById("modalGridSelector");

let GRID_ROWS;
let GRID_COLS;
let PIXEL_SIZE;

let mouseDown = false;
let mouseOver = false;
let toolsObject = {
    rainbowfy: false,
    eraser: false,
    darkeningEffect: false,
}

// Event listeners
document.addEventListener("mouseup", () => {
    mouseDown = false;
});

document.addEventListener("mouseleave", () => {
    mouseDown = false;
});

changeGridBtn.addEventListener("click", () => {
    modal.showModal();
});

submitModalBtn.addEventListener("click", () => {
    changeGridValues(gridSelector.value);
    removeGrid();
    makeGrid(GRID_ROWS, GRID_COLS, PIXEL_SIZE);
    modal.close();
});

// Add an event listener to all the tools
Array.from(tools.children).forEach(child => {
    if (child.id.search("Tool") >= 0) {
        child.addEventListener("click", (e) => {
            toggleCurrentTool(e);
        });
    }
});

//* Function that toggles a tool
function toggleCurrentTool(event) {
    var currentTool = event.currentTarget;

    if (currentTool.id === "rainbowTool") {
        changeToolState("rainbowfy", event);
    } else if (currentTool.id === "eraserTool") {
        changeToolState("eraser", event);
    } else if (currentTool.id === "darkeningEffectTool") {
        changeToolState("darkeningEffect", event);
    }
}

//* Function to toggle between tool states
function changeToolState(state, event) {
    // Toggle states
    toolsObject[state] = !toolsObject[state];
    
    // Deactivate other tools
    deactivateTools(state, "#a8a8a8");
    
    let backgroundColor = (toolsObject[state]) ? "#49bdf3" : "#a8a8a8";
    changeBackgroundColor(event.currentTarget, backgroundColor);
}

//* Function to deactive all the other tools
function deactivateTools(state, color) {
    // Deactivates all the other tools in the object
    for (let tool in toolsObject) {
        if (tool !== state) {
            toolsObject[tool] = false;
        }
    }
    // Changes the background to a deactivated color state
    Array.from(tools.children).forEach(child => {
        if (child.id.search("Tool") >= 0) {
            changeBackgroundColor(child, color);
        }
    });
}

//* Function to fill the grid with pixels
function fillGrid(rows, cols, size) {
    for (let row = 0; row < rows; row++) {
        let pixelsContainer = document.createElement("div");
        
        for (let col = 0; col < cols; col++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            // Adjust each pixels
            pixel.style.width = `${size}px`;
            pixel.style.height = `${size}px`;
            changeBackgroundColor(pixel, "#ffffff");
            
            // Ensures that a pixel's background color is changed when both event are met
            pixel.addEventListener("mouseover", (e) => {
                if (mouseDown) {
                    changePixelColor(e);
                }
            });

            pixel.addEventListener("mousedown", (e) => {
                mouseDown = true;
                changePixelColor(e);
            });
            
            pixelsContainer.appendChild(pixel);
        }
        canvasContainer.appendChild(pixelsContainer);
    }
}

//* Function to remove the GRID
function removeGrid() {
    canvasContainer.innerHTML = "";
}

//* Function to round the corners of the grid
function roundGrid(rows, cols) {
    canvasContainer.children[0].children[0].style.borderTopLeftRadius = "10px";
    canvasContainer.children[rows-1].children[0].style.borderTopRightRadius = "10px";
    canvasContainer.children[0].children[cols-1].style.borderBottomLeftRadius = "10px";
    canvasContainer.children[rows-1].children[cols-1].style.borderBottomRightRadius = "10px";
}

//* Function to change the grid cols and rows
function changeGridValues(gridValue) {
    switch (gridValue) {
        case "64x64":
            GRID_ROWS = 12;
            GRID_COLS = 8;
            PIXEL_SIZE = 64;
            break;
        case "32x32":
            GRID_ROWS = 24;
            GRID_COLS = 15;
            PIXEL_SIZE = 32;
            break;
        case "16x16":
            GRID_ROWS = 46;
            GRID_COLS = 28;
            PIXEL_SIZE = 16;
            break;
        default:
            break;
    }
}

//* Function to change the color of a pixel
function changePixelColor(event) {
    let color = colorPickerInput.value;
    if (toolsObject["rainbowfy"]) {
        color = getRandomColor(210);
    } else if (toolsObject["eraser"]) {
        color = "rgb(255, 255, 255)";
    } else if (toolsObject["darkeningEffect"]) {
        color = getDarkeningEffect(event.currentTarget.style.backgroundColor, 10)
    }
    changeBackgroundColor(event.currentTarget, color);
    
}

//* Function that darkens the pixel
function getDarkeningEffect(currentColor, percentage) {
    let rgb = getRGB(currentColor);
    
    // Darken each color
    const darkenedRGB = rgb.map((color) => color - (color * (percentage/100)));
    
    return `rgb(${darkenedRGB.join(", ")})`
}

//* Function that returns a list of rgb values
function getRGB(rgbString) {
    // Extract RGB components from the string
    return rgbString.match(/\d+/g).map(color => parseInt(color));
}

//* Function that returns a random color
function getRandomColor(maxColorRange) {
    let red = Math.floor(Math.random() * maxColorRange);
    let green = Math.floor(Math.random() * maxColorRange);
    let blue = Math.floor(Math.random() * maxColorRange);
    return `rgb(${red}, ${green}, ${blue})`;
}

//* Function to change the bg color
function changeBackgroundColor(element, color) {
    element.style.background = color;
}

//* function to make a grid
function makeGrid(rows, cols, size) {
    fillGrid(rows, cols, size);
    roundGrid(rows, cols);
}

changeGridValues("32x32");
makeGrid(GRID_ROWS, GRID_COLS, PIXEL_SIZE);