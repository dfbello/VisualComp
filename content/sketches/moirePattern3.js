let angle = 0;
let spacing = 10;

function setup() {
  createCanvas(400, 400);
  noStroke();
  rectMode(CENTER);
  //frameRate(30);
}

function draw() {
  background(220);
  if (keyIsDown(LEFT_ARROW)) {
    // Draw first set of lines
    for (let x = -width; x < width; x += spacing) {
      let y = map(sin(angle + x * 0.01), -1, 1, 0, height);
      fill(255, 0, 0);
      rect(x, y, 2, height);
    }
  }
   else if (keyIsDown(RIGHT_ARROW)) {
    // Draw second set of lines
    for (let y = -height; y < height; y += spacing) {
      let x = map(sin(angle + y * 0.01), -1, 1, 0, width);
      fill(0, 0, 255);
      rect(x, y, width, 2);
    }
  }
 else {
    // Draw first set of lines
  for (let x = -width; x < width; x += spacing) {
    let y = map(sin(angle + x * 0.01), -1, 1, 0, height);
    fill(255, 0, 0);
    rect(x, y, 2, height);
  }
    // Draw second set of lines
    for (let y = -height; y < height; y += spacing) {
      let x = map(sin(angle + y * 0.01), -1, 1, 0, width);
      fill(0, 0, 255);
      rect(x, y, width, 2);
    }
  }
  if (!keyIsDown(UP_ARROW)){
   // Update angle for animation
    angle += 0.1; 
  }
}
