
let xVar = 200
let numRings = 40;  // number of rings
let ringSpacing = 5;  // spacing between rings
let ringWidth = 2;  // width of each ring
let ringColor = [255, 0, 0];  // color of rings
let speedSlider;
let speed = 0.5;
let direction = true;

function setup() {
  createCanvas(400, 400);
  speedSlider = createSlider(0, 10, 5, 1);
  speedSlider.position(10,10);
  speedSlider.style("width", "80px");
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
  maxRadius = numRings*ringSpacing + ringWidth / 2;
  if (direction){
    xVar += speedSlider.value()/10;
  }
  else {
    xVar -= speedSlider.value()/10;
  }
  if (xVar + maxRadius > width + 50){
    direction = false
  }
  else if (xVar - maxRadius < -50){
    direction = true
  }
}