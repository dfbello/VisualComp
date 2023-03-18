let colorRange = [20,230]
let Rslider, Gslider, Bslider;
let Hslider, Sslider, Lslider;

function setup() {
  createCanvas(windowWidth - 19, windowHeight - 20);
  
  background(random(colorRange[0],colorRange[1]), random(colorRange[0],colorRange[1]),random(colorRange[0],colorRange[1]));
  
  Rslider = createSlider(0,255, 125,0);
  Gslider = createSlider(0,255, 125,0);
  Bslider = createSlider(0,255, 125,0);
  
  Hslider = createSlider(0,360,360,0);
  Sslider = createSlider(0,100,0,0);
  Lslider = createSlider(0,100,50,0);
}

function draw() {
  let R = Rslider.value();
  Rslider.position(15, height * 2/3 + 10);
  let G = Gslider.value();
  Gslider.position(15, height * 2/3 + 30);
  let B = Bslider.value();
  Bslider.position(15, height * 2/3 + 50);
  
  let H = Hslider.value();
  Hslider.position(width * (1-2/6), height * 2/3 + 10);
  let S = Sslider.value();
  Sslider.position(width * (1-2/6), height * 2/3 + 30);
  let L = Lslider.value();
  Lslider.position(width * (1-2/6), height * 2/3 + 50);
  
  push(); //left rectangle RGB
  noStroke();
  fill(R,G,B);
  rect(0, 0, width /3, height * 2/3);
  pop();
  
  push(); //right rectangle HSL
  noStroke();
  colorMode(HSL);
  fill(H,S,L);
  rect(width, 0, -width/3, height * 2/3)
  pop();
  
  push();
  rectMode(CORNERS);
  textFont("Arial");
  textSize(35);
  textAlign(CENTER,CENTER);
  text("RGB", 0, 0, width /3, height * 2/3);
  text("HSL", width, 0, -width/3, height * 2/3);
  pop();
  
}