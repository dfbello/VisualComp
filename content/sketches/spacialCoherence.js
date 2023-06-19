let myShader, img, slider;
let val;

function preload() {
  img = loadImage("/showcase/sketches/assets/035.jpg");
  myShader = loadShader('/showcase/sketches/shaders/spacialCoherence.vert', '/showcase/sketches/shaders/spacialCoherence.frag');
}

function setup() {
  createCanvas(700, 491, WEBGL);
  noStroke();
  slider = createSlider(1,300, 300, 2);
  slider.position(10,10);
  
}

function draw() {
  val = slider.value();
  background(220);
  
  myShader.setUniform('texture', img);
  myShader.setUniform('tiles', val);
  
  shader(myShader);
  
  rect(0, 0, width, height);
}