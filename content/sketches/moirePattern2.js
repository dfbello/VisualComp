let angle = 0;
let spacingSlider;
let speedSlider;
let numSlider;

function setup() {
  createCanvas(500, 550);
  noFill();
  stroke(255);
  spacingSlider = createSlider(2, 10, 5);
  spacingSlider.position(10, 10);
  spacingSlider.style("width", "80px");
  speedSlider = createSlider(0, 10, 3);
  speedSlider.position(10, 30);
  speedSlider.style("width", "80px");
  numSlider = createSlider(10, 40, 10);
  numSlider.position(10, 50);
  numSlider.style("width", "80px");
}

function draw() {
  let spacingVal = spacingSlider.value();
  let speedVal = speedSlider.value()/100;
  let numVal = numSlider.value();
  background(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < 50; i++) {
    let diameter1 = (i + 1) * spacingVal;
    let diameter2 = (i + 1) * spacingVal + 5;
    let x1 = (cos(angle + (i * PI) / numVal) * diameter1) / 2;
    let y1 = (sin(angle + (i * PI) / numVal) * diameter1) / 2;
    let x2 = (cos(-angle + (i * PI) / numVal) * diameter2) / 2;
    let y2 = (sin(-angle + (i * PI) / numVal) * diameter2) / 2;
    ellipse(x1, y1, diameter1);
    ellipse(x2, y2, diameter2);
  }
  angle += speedVal;
}
