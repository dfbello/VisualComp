let maskShader, mask_pg;
let lensShader, lens_pg;
let lumaShader, luma_pg;
let src;
let img_src;
let video_src;
let video_on;
let maskSelect;
let roi;
let luma;
let lenRadius;
let magnification;

function preload() {
  maskShader = readShader('/showcase/sketches/shaders/imgProcessing/mask.frag',
    { varyings: Tree.texcoords2 });
  lumaShader = readShader('/showcase/sketches/shaders/imgProcessing/bright.frag',
    { varyings: Tree.texcoords2 });
  lensShader = readShader('/showcase/sketches/shaders/imgProcessing/lens.frag',
    { varyings: Tree.texcoords2 });
  video_src = createVideo(['/showcase/sketches/assets/mapache.webm']);
  video_src.hide();
  img_src = loadImage('/showcase/sketches/assets/aiImage1.jpg');
  src = img_src;
}

function setup() {
  createCanvas(600, 600);

  mask_pg = createGraphics(width, height, WEBGL);
  mask_pg.colorMode(RGB, 1);
  mask_pg.textureMode(NORMAL);
  mask_pg.shader(maskShader);
  
  luma_pg = createGraphics(width, height, WEBGL);
  luma_pg.colorMode(RGB, 1);
  luma_pg.textureMode(NORMAL);
  luma_pg.shader(lumaShader);
  
  lens_pg = createGraphics(width, height, WEBGL);
  lens_pg.colorMode(RGB, 1);
  lens_pg.textureMode(NORMAL);
  lens_pg.shader(lensShader);
  
  video_on = createCheckbox('video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    src = video_on.checked() ? video_src : img_src;
    video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(10, 10);
  
  luma = createSelect();
  luma.position(10, 30);
  luma.option('None');
  luma.option('Luma');
  luma.option('HSV value V');
  luma.option('HSL lightness L');
  luma.option('CIELAB');
  
  maskSelect = createSelect();
  maskSelect.position(140,10);
  maskSelect.option('Identity');
  maskSelect.option('Ridge detection');
  maskSelect.option('Sharpen');
  maskSelect.option('Blur');
  maskSelect.option('Convolution');
  maskSelect.option('Unsharp masking (5x5)');
  maskSelect.option('Gaussian Blur (5x5)');
  
  roi = createSelect();
  roi.position(140, 30);
  roi.style('width', '160px');
  roi.option("Magnifier");
  roi.option("Region of interest");
  roi.input(() => {
    if (roi.value() == "Region of interest"){
      magnification.attribute('disabled', '');
    } else {
      magnification.removeAttribute('disabled');
    }
  })
  
  lenRadius = createSlider(0.1, 0.3, 0.15, 0.01);
  lenRadius.position(310, 10);
  lenRadius.style('width', '80px');
  lenRadius.input(() => {
    maskShader.setUniform('lens_radius', lenRadius.value())
    lensShader.setUniform('lens_radius', lenRadius.value())
    });
  maskShader.setUniform('lens_radius', lenRadius.value());
  lensShader.setUniform('lens_radius', lenRadius.value());
  
  magnification = createSlider(1, 8, 2, 0);
  magnification.position(310, 30);
  magnification.style('width', '80px');
  magnification.input(() => {
    lensShader.setUniform('magnification', magnification.value())
    });
  lensShader.setUniform('magnification', magnification.value());
}

function draw() {
  emitTexOffset(maskShader, src, [uniform = 'texOffset'])
  maskShader.setUniform('mask', maskChange());
  maskShader.setUniform('customLen', maskChange().length);
  mask_pg.emitResolution(maskShader, 'iResolution');
  mask_pg.emitPointerPosition(maskShader, mouseX, mouseY, 'iMouse');
  maskShader.setUniform('roi', roi.value() == "Region of interest");
  maskShader.setUniform('texture', src);
  pg = mask_pg;
  pg.quad(1, 1, -1, 1, -1, -1, 1, -1);
   
  lumaShader.setUniform('brightTool', lumaChange());
  lumaShader.setUniform('texture', pg)
  pg = luma_pg;
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  
  lens_pg.emitResolution(lensShader, 'iResolution');
  lens_pg.emitPointerPosition(lensShader, mouseX, mouseY, 'iMouse');
  lensShader.setUniform('roi', roi.value() == "Region of interest");
  lensShader.setUniform('texture', pg)
  pg = lens_pg;
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  
  image(pg, 0, 0)
}

function maskChange (){
  switch (maskSelect.value()) {
    case 'Identity':
      matrix = [0, 0, 0,
                0,  1, 0,
                0, 0, 0 ];
      break;
    case 'Ridge detection':
      matrix = [-1, -1, -1,
                 -1,  8, -1,
                 -1, -1, -1 ]; 
      break;
    case 'Sharpen':
      matrix = [ 0, -1, 0,
                 -1,  5, -1,
                 0, -1, 0 ]; 
      break;
    case 'Blur':
      matrix = [ 1/9, 1/9, 1/9,
                 1/9,  1/9, 1/9,
                 1/9, 1/9, 1/9 ]; 
      break;
    case 'Convolution':
      matrix = [ -1, -1, -1 ,
                 -1,  9, -1 ,
                 -1, -1, -1 ];    
      break;
    case 'Unsharp masking (5x5)':
      matrix = [ -1/256, -4/256, -6/256, -4/256, -1/256,
              -4/256, -16/256, -24/256, -16/256, -4/256,
              -6/256, -24/256, 476/256, -24/256, -6/256, 
              -4/256, -16/256, -24/256, -16/256, -4/256,
              -1/256, -4/256, -6/256, -4/256, -1/256]; 
      break;
      case 'Gaussian Blur (5x5)':
      matrix = [ 1/256,  4/256,  6/256,  4/256, 1/256,                                  4/256, 16/256, 24/256, 16/256, 4/256,                                  6/256, 24/256, 36/256, 24/256, 6/256,                                  4/256, 16/256, 24/256, 16/256, 4/256,                                  1/256,  4/256,  6/256,  4/256, 1/256 ];
  }
  return matrix;
}

function lumaChange(){
  switch(luma.value()){
    case 'None':
      return 1;
    case 'Luma':
      return 2;
    case 'HSV value V':
      return 3;
    case 'HSL lightness L':
      return 4;
    case 'CIELAB':
      return 5;
  }
}