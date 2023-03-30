let angle = 0;
function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  strokeWeight(3);
}

function draw() {
  background(255);
  for (let y = 0; y < height; y += 10) {
    line(0, y, width, y);
  }
  push();
  translate(width/2, height/2); 
  rotate(angle);
  for (let y = -height; y < height; y += 10) {
    line(-width/2, y, width/2, y);
  }
  pop();
  if (!mouseIsPressed){
    angle += 1
  }
}
