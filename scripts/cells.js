let cellSize; // Desired size of each square cell
let cols, rows;
let colors;
let canvas;
function setup() {
  //   // Select the container element
  //   const container = document.getElementById('canvas');

  //   // Create a canvas with the size of the container
  //   let canvas = createCanvas(container.offsetWidth, container.offsetHeight);

  //   // Attach the canvas to the container
  //   canvas.parent(container);
  canvas = createCanvas(windowWidth, windowHeight + 50);
  cols = floor(windowWidth / 50); // Set the base number of columns (adjustable)
  cellSize = width / cols;
  canvas.position(0, 0);
  canvas.style("z-index", -1);
  canvas.style("margin", "auto");
  canvas.style("opacity", "50%");
  // Dynamically calculate the number of columns and rows
  rows = floor(height / cellSize);

  colors = [
    color("#98BB6C"),
    color("#DCD7BA"),
    color("#D27E99"),
    color("#9CABCA"),
    color("#2A2A37"),
    color("#E82424"),
  ];
}

function windowResized() {
  cols = floor(windowWidth / 50); // Set the base number of columns (adjustable)
  cellSize = width / cols;
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function draw() {
  console.log("Draw called");
  // Loop through each row and column
  for (let row = 2; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Draw the cell background
      drawCellBackground(row, col);

      // Draw a random shape in the cell
      drawRandomShape(row, col);
    }
  }
  noLoop(); // Stop looping after drawing
}

function drawCellBackground(row, col) {
  // Choose a random background color
  let bgColor = randomColor();
  fill(bgColor);
  noStroke();

  // Calculate the top-left corner of the cell
  let xStart = col * cellSize;
  let yStart = row * cellSize;

  // Draw the rectangle to fill the cell
  rect(xStart, yStart, cellSize, cellSize);
}

function drawRandomShape(row, col) {
  // Choose a random shape
  let shapes = ["square", "circle", "triangle"];
  let shape = shapes[floor(random(shapes.length))];

  // Calculate the center of the cell
  let xCenter = col * cellSize + cellSize / 2;
  let yCenter = row * cellSize + cellSize / 2;

  // Set the shape size (scaled to fit within the cell)
  let size = cellSize * 0.5;

  // Set a random fill color for the shape
  let shapeColor = randomColor();
  fill(shapeColor);

  // Draw the chosen shape
  if (shape === "square") {
    drawCenteredSquare(xCenter, yCenter, size);
  } else if (shape === "circle") {
    drawCenteredCircle(xCenter, yCenter, size);
  } else if (shape === "triangle") {
    drawCenteredTriangle(xCenter, yCenter, size);
  }
}

function drawCenteredSquare(xCenter, yCenter, size) {
  rectMode(CENTER);
  rect(xCenter, yCenter, size, size);
  rectMode(CORNER);
}

function drawCenteredCircle(xCenter, yCenter, diameter) {
  ellipse(xCenter, yCenter, diameter);
}

function drawCenteredTriangle(xCenter, yCenter, size) {
  // Calculate the triangle vertices
  let halfSize = size / 2;
  let x1 = xCenter;
  let y1 = yCenter - halfSize; // Top vertex
  let x2 = xCenter - halfSize;
  let y2 = yCenter + halfSize; // Bottom-left vertex
  let x3 = xCenter + halfSize;
  let y3 = yCenter + halfSize; // Bottom-right vertex

  // Draw the triangle
  triangle(x1, y1, x2, y2, x3, y3);
}

function randomColor() {
  return colors[Math.floor(random(colors.length))];
}

// // Handle window resizing
// function windowResized() {
//   const container = document.getElementById("canvas");
//   resizeCanvas(container.offsetWidth, container.offsetHeight);

//   // Recalculate the number of columns and rows
//   cols = floor(width / cellSize);
//   rows = floor(height / cellSize);

//   // Redraw the canvas
//   redraw();
// }
