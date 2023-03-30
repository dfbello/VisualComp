let rectSpeed = 0.6;
let xPos = 0;
let colorCheck;
function setup() {
  createCanvas(600, 300);
  colorCheck = createCheckbox(" Cambiar color", false);
  colorCheck.position(12,10);
  colorCheck.style("color", "blue");
  colorCheck.style("backgroundColor", "gray");
  colorCheck.style("padding", "3px");
}

function draw() {
  background(255);
  let len = 10;
  for(let i = 0;i<width/len;i++){
    fill("black");
    if(i%2 === 0){
      rect(i*len,height,len,-height);
    }
  }
  if(mouseIsPressed){
    background(50);
  }
  noStroke();
  if (colorCheck.checked()){
    push();
    fill("yellow");
    rect(xPos,80,100,40);
    fill("blue");
    rect(xPos,180,100,40);
    pop();
  } else {
    push();
    fill("white");
    rect(xPos,80,100,40);
    fill("black");
    rect(xPos,180,100,40);
    pop();
  }
  
  xPos += rectSpeed;
  if(xPos+100 >= width || xPos <= 0){
    rectSpeed*=-1;
  }
}