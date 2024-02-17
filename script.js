const colorPickerInput = document.getElementById("currentColor");
const gridContainer = document.getElementById("gridContainer");

// Function to fill the grid by divs
function fillGrid(rows, cols, size) {
    for (let row = 0; row < rows; row++) {
        // This Container represents each row of the grid
        let pixelContainer = document.createElement("div");
        pixelContainer.id = "pixelContainer";
        pixelContainer.classList.add("pixel-container");

        for (let col = 0; col < cols; col++) {
            // Each pixel represents a column for a row in the grid
            let pixel = document.createElement("div");
            pixel.id = "pixel";
            pixel.classList.add("pixel");

            // Adjust the size of the pixel
            pixel.style.width = `${size}px`
            pixel.style.height = `${size}px`

            // Add an event listener
            pixel.addEventListener("click", (e) => {
                changePixelColor(e)
            });

            pixelContainer.appendChild(pixel);
        }
        gridContainer.appendChild(pixelContainer);
    }
}

// Function to change the color of a pixel
function changePixelColor(event) {
    console.log(event);
    let color = colorPickerInput.value;
    event.target.style.background = color;
}


fillGrid(46, 28, 16);