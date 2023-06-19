function setup() {
  createCanvas(600, 500, WEBGL);
}

function draw() {
  background(200);
  fill(51, 64, 209);
  rotateX(frameCount * 0.01);
  torus(100, 50);
}
