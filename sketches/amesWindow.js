let win;
let a = 0;
let aV;

function preload() {
  win = loadImage("Ames_window.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  aV = TAU / 360 / 1.5;
}

function draw() {
  background(255);

  rotateY(a);
  scale(1.5);
  imageMode(CENTER);
  image(win, 0, 0);
  a += aV;
}
