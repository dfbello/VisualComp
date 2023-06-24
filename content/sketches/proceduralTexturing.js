let pg;
let truchetShader;
let colorShader;
let plasmaShader;
let tilesShader;
let texturePicker;
let shapePicker;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader("/VisualComp/sketches/shaders/proceduralTexturing/bricks.frag", {
    matrices: Tree.NONE, varyings: Tree.NONE,});
  colorShader = readShader("/VisualComp/sketches/shaders/proceduralTexturing/color.frag", {
    matrices: Tree.NONE, varyings: Tree.NONE,});
  plasmaShader = readShader("/VisualComp/sketches/shaders/proceduralTexturing/plasma.frag", {
    matrices: Tree.NONE, varyings: Tree.NONE,});
  tilesShader = readShader("/VisualComp/sketches/shaders/proceduralTexturing/tiles.frag", {
    matrices: Tree.NONE, varyings: Tree.NONE,});
}

function setup() {
  createCanvas(500, 500, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(500, 500, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  
  pg.shader(tilesShader);
  pg.emitResolution(tilesShader);
  tilesShader.setUniform('u_zoom', 3);
  pg.shader(truchetShader);
  pg.emitResolution(truchetShader);
  truchetShader.setUniform('u_zoom', 3);
  pg.shader(colorShader);
  pg.emitResolution(colorShader);
  colorShader.setUniform('u_zoom', 3);
  pg.shader(plasmaShader);
  pg.emitResolution(plasmaShader);
  plasmaShader.setUniform('u_zoom', 3);
  
  texturePicker = createSelect();
  texturePicker.position(10,10);
  texturePicker.option('Tiles');
  texturePicker.option('Bricks');
  texturePicker.option('Color');
  texturePicker.option('Plasma');
  
  shapePicker = createSelect();
  shapePicker.position(10,30);
  shapePicker.option('Box');
  shapePicker.option('Torus');
  shapePicker.option('Sphere');
  shapePicker.option('Cylinder');
  shapePicker.option('Cone');
  
}

function draw() {
  background(33);
  
  switch(texturePicker.value()){
    case 'Tiles':
      pg.shader(tilesShader);
      pg.emitResolution(tilesShader);
      break;
    case 'Bricks':
      pg.shader(truchetShader);
      pg.emitResolution(truchetShader);
      break;
    case 'Color':
      pg.shader(colorShader);
      pg.emitResolution(colorShader);
      break;
    case 'Plasma':
      pg.shader(plasmaShader);
      pg.emitResolution(plasmaShader);
      break;
  }
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
  orbitControl();
  rotateX(millis() / 10000 - 0.5);
  rotateY(millis() / 10000 + 0.5);
  switch (shapePicker.value()){
    case 'Box':
      box(200, 200);
      break;
    case 'Torus':
      torus(75, 75);
      break;
    case 'Sphere':
      sphere(150, 150);
      break;
    case 'Cylinder':
      cylinder(100, 200);
      break;
    case 'Cone':
      cone(125, -225);
      break;
  }
  
}

function mouseMoved() {
    switch(texturePicker.value()){
    case 'Tiles':
      tilesShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      break;
    case 'Bricks':
      truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      break;
    case 'Color':
      colorShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
      pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      break;
  }
}