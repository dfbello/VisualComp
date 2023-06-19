let imageCells;
let pg;
let mosaic;
let image_src;
let video_src;
let debug;
let cols;
// ui
let resolution;
let sel;
let video_on;
let p;

let luma;
let rgb;

const SAMPLE_RES = 100;

function preload() {
  //Target video and image
  image_src = loadImage("/showcase/sketches/assets/jordan.jpg");
  video_src = createVideo(["/showcase/sketches/assets/imola.mp4"]);
  video_src.hide();
  mosaic = readShader("/showcase/sketches/shaders/photomosaic.frag");
  //Image Palette
  p = [];
  for (let i = 1; i <= 36; i++) {
    if (i.toString().length == 1) {
      p.push(loadImage(`/showcase/sketches/assets/00${i}.jpg`));
    } else {
      p.push(loadImage(`/showcase/sketches/assets/0${i}.jpg`));
    }
  }
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 650, WEBGL);
  colorMode(RGB, 1);
  imageCells = createQuadrille(p);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  sel = createSelect();
  sel.position(10, 10);
  sel.option("keys");
  sel.option("symbols");
  sel.selected("symbols");
  sel.changed(() => {
    mosaic.setUniform("debug", sel.value() === "keys");
    mosaic.setUniform("color_on", false);
  });

  video_on = createSelect();
  video_on.position(10, 30);
  video_on.option("image");
  video_on.option("video");
  video_on.selected("image");
  video_on.changed(() => {
    mosaic.setUniform(
      "source",
      video_on.value() === "image"
        ? image_src
        : video_src
    );
    if (video_on.value() === "video") {
      video_src.loop();
    } else {
      video_src.pause();
    }
  });

  video_on.position(10, 30);
  mosaic.setUniform("source", image_src);
  resolution = createSlider(10, 300, SAMPLE_RES, 5);
  resolution.position(10, 50);
  resolution.style("width", "80px");
  resolution.input(() => {
    mosaic.setUniform("resolution", resolution.value());
  });
  mosaic.setUniform("resolution", resolution.value());
  pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
  mosaic.setUniform("cols", imageCells.width);
  sample();
}

function sample() {
  if (pg.width !== SAMPLE_RES * imageCells.width) {
    pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
    mosaic.setUniform("cols", imageCells.width);
  }
  imageCells.sort({
    ascending: true,
    cellLength: SAMPLE_RES,
    mode: "LUMA",
  });

  luma = imageCells.saveLuma({
    cellLength: SAMPLE_RES,
  });
  rgb = imageCells.saveRGB({
    cellLength: SAMPLE_RES,
  });
  drawQuadrille(imageCells, {
    graphics: pg,
    cellLength: SAMPLE_RES,
    outlineWeight: 0,
  });
  mosaic.setUniform("palette", pg);
  mosaic.setUniform("lumas", luma);
  mosaic.setUniform("red_palette", rgb.r);
  mosaic.setUniform("green_palette", rgb.g);
  mosaic.setUniform("blue_palette", rgb.b);
}

function draw() {
  cover({
    texture: true,
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
