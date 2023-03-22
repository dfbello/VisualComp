function setup() {
  var myCanvas = createCanvas(500, 500, WEBGL);
}

function draw() {
  var k = map(mouseX, 0, width, 400, 0);
  background(255);
  stroke(101, 82, 82);
  fill(255, 255, 255);
  translate(0, 0, k);
  translate(0, 0, -200);
  rotateX(radians(-10));
  rotateY(radians(-57));
  fill(94, 11, 11);
  box(100, 10, 100);
  fill(101, 82, 82);
  translate(50, -40, -50);
  box(5, 100, 5);
  translate(-100, 0, 0);
  box(5, 100, 5);
  translate(50, -15, 0);
  fill(94, 11, 11);
  box(100, 50, 1);
  rotateY(radians(57));
  rotateX(radians(10));
  translate(-50, 95, 250);
  fill(101, 82, 82);
  box(5, 50, 5);
  translate(-36.7, -12, 0);
  box(5, 45, 5);
  translate(55, 4, 0);
  box(5, 35, 5);
  translate(39, 5, 0);
  box(5, 57, 5);
  rotateZ(radians(-80));
  translate(0, -20, 0);
  box(5, 40, 5);
}
