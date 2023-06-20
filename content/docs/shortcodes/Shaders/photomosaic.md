---
weight: 6
---

# Photomosaic

## Intro and Background

Un fotomosaico es una imagen (o un video) compuesto por secciones más pequeñas, donde cada sección está ocupada por una imagen, organizadas de tal forma que la imagen objetivo sea reconocible. El concepto de fotomosaico precede a los gráficos por computadora, pero debido a su gran poder y fácil acceso, estos han popularizado la creación de estas obras.

Antes de la era de los gráficos por computadora, los fotomosaicos se creaban de manera manual utilizando técnicas artesanales. Aunque los procesos eran más laboriosos y requerían una habilidad artística y meticulosidad significativas, se lograban resultados impresionantes. 

Para generar un fotomosaico exitosamente necesitamos una paleta de imágenes ordenada según alguna medida de luminosidad definida previamente. La imagen objetivo es segmentada en partes más pequeñas donde cada segmento es correspondido con la imagen dentro de la paleta que mejor lo describa, por último la textura de la imagen se mapea a su segmento correspondiente.

## Code and Results

La imagen (o video) objetivo y la paleta de imágenes es definida desde el sketch:

{{<highlight js>}}
function preload() {
  //Target video and image
  image_src = loadImage("/showcase/sketches/assets/f1cars/jordan.jpg");
  video_src = createVideo(["/showcase/sketches/assets/f1cars/imola.mp4"]);
  video_src.hide();
  mosaic = readShader("/showcase/sketches/shaders/photomosaic/photomosaic.frag");
  //Image Palette
  p = [];
  for (let i = 1; i <= 36; i++) {
    if (i.toString().length == 1) {
      p.push(loadImage(`/showcase/sketches/assets/f1cars/00${i}.jpg`));
    } else {
      p.push(loadImage(`/showcase/sketches/assets/f1cars/0${i}.jpg`));
    }
  }
}
{{</highlight>}}

Y posteriormente enviadas al fragment shader:

{{<highlight js>}}
video_on.changed(() => {
    mosaic.setUniform(
      "source",
      video_on.value() === "image"
        ? image_src
        : video_src
    );
{{</highlight>}}

{{< hint info >}}
**Características**
* El primer *select* sirve para seleccionar la composición del objetivo, entre las opciones están las *keys* asociados a cada segmento y las imágenes de la paleta.
* El segundo *select* se usa para cambiar el objetivo entre una imagen y un video.
* El slider modifica la resolución que tiene el objetivo.
{{< /hint >}}

{{< p5-iframe sketch="/showcase/sketches/photomosaic.js" lib1="/showcase/sketches/lib/p5.shaderbox.js" lib2="/showcase/sketches/lib/p5.quadrille.js" width="675" height="675" >}}

{{<hint warning>}}
El rendimiento del vídeo puede variar según las especificaciones de su equipo.
{{</hint>}}

{{<details photomosaic.js>}}
{{<highlight js>}}
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
  image_src = loadImage("/showcase/sketches/assets/f1cars/jordan.jpg");
  video_src = createVideo(["/showcase/sketches/assets/f1cars/imola.mp4"]);
  video_src.hide();
  mosaic = readShader("/showcase/sketches/shaders/photomosaic/photomosaic.frag");
  //Image Palette
  p = [];
  for (let i = 1; i <= 36; i++) {
    if (i.toString().length == 1) {
      p.push(loadImage(`/showcase/sketches/assets/f1cars/00${i}.jpg`));
    } else {
      p.push(loadImage(`/showcase/sketches/assets/f1cars/0${i}.jpg`));
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

{{</highlight>}}
{{</details>}}

{{<details photomosaic.frag>}}
{{<highlight js>}}
precision mediump float;

const int num_images = 36;

// source (image or video) is sent by the sketch
uniform sampler2D source;

// palette is sent by the sketch
uniform sampler2D palette;
// number of cols are sent by sketch
uniform float cols;

uniform float lumas[num_images];
uniform float red_palette[num_images];
uniform float green_palette[num_images];
uniform float blue_palette[num_images];

// toggles debug
uniform bool debug;

// toggles coloring
uniform bool color_on;
uniform vec4 background;
uniform vec4 foreground;

// target horizontal & vertical resolution
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

float luma(vec3 color) {
  return (0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
}

void main() {
  vec2 fontCoord = vTexCoord * resolution;
  vec2 srcCoord = floor(fontCoord);
  fontCoord = fontCoord - srcCoord;
  srcCoord = srcCoord / vec2(resolution);
  float mid = 1.0/(2.0*resolution);
  srcCoord = srcCoord + vec2(mid);

  vec4 key = texture2D(source, srcCoord);
  if (debug) {
    gl_FragColor = key;
  } else {

    float lumakey = luma(key.rgb);
    float selected = 0.0;

    bool complete = false;
    for(float j = 0.02; j <= 0.5; j += 0.02){
      for(int i = 0 ; i < num_images; i ++)
      {
        if((red_palette[i]/255.0> (key.r - j) && red_palette[i]/255.0 < (key.r + j)) && (green_palette[i]/255.0> (key.g - j) && green_palette[i]/255.0 < (key.g + j)) && (blue_palette[i]/255.0> (key.b - j) && blue_palette[i]/255.0 < (key.b + j))){
          selected = float(i);
          complete = true;
          break;
        }
      }
      if(complete){
        break;
      }
    }
    
    vec2 tile = vec2((floor(selected) + fontCoord.x) / cols, fontCoord.y);

    vec4 paletteTexel = texture2D(palette, tile);
    gl_FragColor = paletteTexel;
  }
}
{{</highlight>}}
{{</details>}}

## Conclusions and Future work

A partir de lo anterior podemos concluir:

- El fotomosaico es una técnica interesante que combina múltiples imágenes más pequeñas para formar una imagen más grande.
- Los gráficos por computadora han facilitado la creación de foto y videomosaicos, un trabajo que sin esta tecnología sería muy difícil o imposible.
- Los fotomosaicos son una combinación interesante entre arte y tecnología.

En cuanto al trabajo futuro, se puede investigar y probar diferentes algoritmos y técnicas para mejorar la calidad y precisión del fotomosaico. Esto puede incluir mejoras en la selección de imágenes de la paleta y en el mapeo de texturas. Además, investigar formas de optimizar el rendimiento del fotomosaico, especialmente cuando se trabaja con imágenes o videos de mayor tamaño. 

{{< expand "Referencias" "...">}}

## References

- https://en.wikipedia.org/wiki/Photographic_mosaic
- https://visualcomputing.github.io/docs/shaders/photomosaic
- https://github.com/mattdesl/lwjgl-basics/wiki/
  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}
