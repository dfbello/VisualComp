let img;
let rectSpeed = 0.5;
let rectLen = 10;
let spacing = 1.2;
let y = 0;

function preload() {
    img = loadImage("/VisualComp/sketches/assets/kinegram.png");
}

function setup() {
    createCanvas(400, 420);
}

function draw() {
  background(255);
  image(img,0,0);
  for(let i = -height/rectLen; i < 0; i+=spacing){
    fill("black");
    rect(0,i*rectLen+y,width,rectLen);
  }
  y += rectSpeed;
  if ((-height+y) >= height) {
      y = 0;
  }
  if(mouseIsPressed){
    background(255);
    image(img,0,0);
  }
}