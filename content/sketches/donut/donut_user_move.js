function setup() {
  createCanvas(600, 500, WEBGL);
}

function draw() {
  background(200);
  fill(51, 64, 209);
  orbitControl(5, 5, 5);
  torus(100, 50);
}
