let gridSlider;
let maxSize = 250;


function setup() {
  createCanvas(600, 600);
  gridSlider = createSlider(2,maxSize,2,5);
  gridSlider.position(10,10); 
}


function draw() {
  background(0);
  gridSize = gridSlider.value(); 
  grid(gridSize, [255,0,0], [0,255,0]);
}

function grid(Size, colorA, colorB){
  
  w = width/Size;
  h = height/Size;
  
  
  noStroke();
  for(i = 0 ; i < Size; i++){
    
    if (i % 2 == 0){
      c = 0;
    }else{
      c = 1;
    }
    
    for(j = 0; j < Size; j++){
      
      if(j % 2 == c){
        fill(colorA);
      }else{
        fill(colorB);
      }
      
      rect(w * i, j * h, w, h);
    }
  }
}

