let gridSpacing;
let slider;


function setup() {
  createCanvas(500, 500);
  slider = createSlider(1,30,6,1);
  slider.position(10,10)
  stroke(255);
}

function draw() {
    background(0);
    gridSpacing = slider.value();
  for(i = 0; i<width*100; i ++){
    line(gridSpacing * i, 0, 0, height*100);
  }
}