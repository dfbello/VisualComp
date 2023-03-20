let xVar = 700 ; 
let direction = true;
let speedSlider;

function setup() {
  createCanvas(700, 200);
  bg = loadImage('/showcase/sketches/assets/pacman.png');
  speedSlider = createSlider(0, 30, 10, 2);
  speedSlider.position(10,10);
  speedSlider.style("width", "80px");
}

function draw() {
    bg.resize(700, 200);
  image(bg, 0, 0);

  if (direction){
    xVar += speedSlider.value()/10;
  }
  else {
    xVar -= speedSlider.value()/10;
  }
  if (xVar  > width){
    direction = false
  }
  else if (xVar < -width/2){
    direction = true
  }

  for (let i = xVar; i < width ; i+=18) {
    let c = color(0, 0, 0);
    fill(c);
    noStroke();
    rect(i, 0, 15, height);
  }
}