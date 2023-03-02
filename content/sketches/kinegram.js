let y = 0;
let yspeed = 5;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(255);
  drawKinegram();
  animatePicketFence();
}

function drawKinegram() {
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(width / 2, height / 2, 200, 200);
}

function animatePicketFence() {
  stroke(0);
  strokeWeight(1);

  for (let i = 0; i < height; i += 10) {
    let x = map(sin(i / 20 + y), -1, 1, 0, width);
    line(x, i, x, i + 10);
  }

  y += yspeed;
}
