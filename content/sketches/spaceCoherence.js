let image_src;
let video_src;
let mosaic;
let resolution;
let video_on;
let mode;
let photoSelect;
let photoA;

function preload() {
  photoA = int(random(1, 5));
  image_src = loadImage(`/showcase/sketches/assets/spacePhotos/photo${photoA}.jpg`);
  video_src = createVideo(['/showcase/sketches/assets/mapache.webm']);
  video_src.hide();
  mosaic = readShader('/showcase/sketches/shaders/spaceCoherence/spaceCoherence.frag',
           { varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 10);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  photoSelect = createSelect();
  photoSelect.position(100, 30);
  photoSelect.option('Photo1');
  photoSelect.option('Photo2');
  photoSelect.option('Photo3');
  photoSelect.option('Photo4');
  photoSelect.selected(`Photo${photoA}`)
  photoSelect.changed(() => {
    if (photoSelect.value() == 'Photo1'){
      image_src = loadImage(`/showcase/sketches/assets/spacePhotos/photo1.jpg`);
      mosaic.setUniform('source', image_src);
    }
    else if (photoSelect.value() == 'Photo2'){
      image_src = loadImage(`/showcase/sketches/assets/spacePhotos/photo2.jpg`);
      mosaic.setUniform('source', image_src);
    }
    else if (photoSelect.value() == 'Photo3'){
      image_src = loadImage(`/showcase/sketches/assets/spacePhotos/photo3.jpg`);
      mosaic.setUniform('source', image_src);
    }
     else if (photoSelect.value() == 'Photo4'){
      image_src = loadImage(`/showcase/sketches/assets/spacePhotos/photo4.jpg`);
      mosaic.setUniform('source', image_src);
    }
  });
  video_on = createCheckbox('video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('source', video_src);
      photoSelect.hide();
      video_src.loop();
    } else {
      mosaic.setUniform('source', image_src);
      photoSelect.show();
      video_src.pause();
    }
  });
  mosaic.setUniform('source', image_src);
  video_on.position(10, 30);
  mode = createSelect();
  mode.position(100, 10);
  mode.option('original');
  mode.option('pixelator');
  mode.selected('pixelator');
  mode.changed(() => {
    mosaic.setUniform('original', mode.value() === 'original');
    mode.value() === 'original' ? resolution.hide() : resolution.show();
  });
}

function draw() {
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}