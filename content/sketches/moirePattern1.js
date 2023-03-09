let xVar = 400/6
let numRings = 20;  // number of rings
let ringSpacing = 5;  // spacing between rings
let ringWidth = 2;  // width of each ring
let ringColor = [255, 0, 0];  // color of rings
let direction = true;

function setup() {
  createCanvas(500, 500);
  frameRate(100);
}

function draw() {
  background(255);

  // draw rings
  noFill();
  strokeWeight(ringWidth);
  //stroke(ringColor);
  for (let i = 0; i < numRings; i++) {
    let radius = i * ringSpacing + ringWidth / 2;
    ellipse(width / 2, height / 2, radius * 2, radius * 2);
  }
  for (let i = 0; i < numRings; i++) {
    let radius = i * ringSpacing + ringWidth / 2;
    ellipse(xVar, height / 2, radius * 2, radius * 2);
  }
  if (direction){
    xVar++;
  }
  else {
    xVar--;
  }
  if (xVar > 5*width/6){
    direction = false
  }
  else if (xVar < width/6){
    direction = true
  }
}