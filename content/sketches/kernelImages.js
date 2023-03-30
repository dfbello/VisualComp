let img;
let histogram = []
let newimg;
let d;
let sel;
let bright = 0
function setup() {
  let fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);
  //Creacion del menu para seleccionar kernel
  sel = createSelect();
  sel.option('Identity');
  sel.option('Ridge detection');
  sel.option('Sharpen');
  sel.option('Blur');
  sel.option('Convolution');
  sel.option('Unsharp masking');
  sel.position(480,10)
  createCanvas(600, 600);
  pixelDensity(1);
}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {});
    newimg = loadImage(file.data, () => {});
  } else {
    console.log('Invalid file type.');
  }
}

function draw() {
  background(225);
  if (img) {
    img.resize(min(280, img.width), min(300, img.height));
    newimg.resize(min(280, newimg.width), min(300, newimg.height));
    image(img, 0, 25);
    let sizem = 3;
    newimg.loadPixels();
    img.loadPixels(); 
    matrix = selection(sel.value());
    for (var x = 0; x < newimg.width; x++) {
      for (var y = 0; y < newimg.height; y++) {
        let c = convolution(img, x, y, matrix, sizem);
        var index =  (y * newimg.width + x) * 4;
        newimg.pixels[index] = c[0];
        newimg.pixels[index + 1] = c[1];
        newimg.pixels[index + 2] = c[2];
        newimg.pixels[index + 3] = 255;
        newimg.pixels[index] += (256*bright)/100;
        newimg.pixels[index+1] += (256*bright)/100;
        newimg.pixels[index+2] += (256*bright)/100;
      }
    }
    newimg.updatePixels();
    image(newimg, width/2, 25);
    text(bright, 10, 350)
    getHistogram(newimg);
    push();
    stroke(255,0,0)
    line(0, 330, width, 330);
    //text("Histograma", 10, 350)
    pop();
    let maxCount = max(histogram);
    stroke(0);
    for (let i = 0; i < histogram.length; i++) {
        let x = map(i, 0, 255, 10, width-10);
        let h = map(histogram[i], 0, maxCount, 0, 250);
        line(x, height, x, height - h);
    }
  }
}

function convolution(img, x, y, matrix, sizem) {
  let r = 0.0;
  let g = 0.0;
  let b = 0.0;
  for (var i = -1; i < sizem - 1; i++) {
    for (var j = -1; j < sizem - 1; j++) {
      let px = x + i;
      let py = y + j;   
      let index = (px + img.width * py)*4; 
      index = constrain(index, 0, img.pixels.length - 1);
      r += img.pixels[index] * matrix[i+1][j+1];
      g += img.pixels[index + 1] * matrix[i+1][j+1];
      b += img.pixels[index + 2] * matrix[i+1][j+1];          
    }
  }
  return [r,g,b];
}

function selection(value) {
  switch (value) {
    case 'Identity':
      matrix = [ [ 0, 0, 0 ],
                 [ 0,  1, 0 ],
                 [ 0, 0, 0 ] ];
      break;
    case 'Ridge detection':
      matrix = [ [ -1, -1, -1 ],
                 [ -1,  8, -1 ],
                 [ -1, -1, -1 ] ]; 
      break;
    case 'Sharpen':
      matrix = [ [ 0, -1, 0 ],
                 [ -1,  5, -1 ],
                 [ 0, -1, 0 ] ]; 
      break;
    case 'Blur':
      matrix = [ [ 1/9, 1/9, 1/9 ],
                 [ 1/9,  1/9, 1/9 ],
                 [ 1/9, 1/9, 1/9 ] ]; 
      break;
    case 'Convolution':
      matrix = [ [ -1, -1, -1 ],
                 [ -1,  9, -1 ],
                 [ -1, -1, -1 ] ];    
      break;
    case 'Unsharp masking':
      matrix = [ [ -1/256, -4/256, -6/256, -4/256, -1/256 ],
                 [ -4/256, -16/256, -24/256, -16/256, -4/256 ],
                 [ -6/256, -24/256, 476/256, -24/256, -6/256], 
                 [ -4/256, -16/256, -24/256, -16/256, -4/256 ],
                 [ -1/256, -4/256, -6/256, -4/256, -1/256 ]]; 
      sizem = 5;    
      break;
    default:
      matrix = [ [ -1, -1, -1 ],
                 [ -1,  9, -1 ],
                 [ -1, -1, -1 ] ]; 
      break;
  }
  return matrix
}

function keyPressed() {
  switch (key) {
    case "+":
      bright += 5;
      break;
    case "-":
      bright -= 5;
  }
}

function getHistogram(img){
    for (let i = 0; i < 256; i++) {
        histogram[i] = 0;
    }
    for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let brightness = round(0.299 * r + 0.587 * g + 0.114 * b);
    histogram[brightness]++;
    }
}