---
weight: 6
---

# Spatial Coherence

## Intro and Background

La coherencia espacial se refiere a un fenómeno en el cual los objetos y los colores que los componen varían en función de la distancia y la posición del observador. Esto proporciona al espectador una información más completa sobre su entorno, incluyendo la profundidad y la distribución de los objetos en el espacio.

## Code and Results

{{< hint info >}}
**Exercises** </br>
- Implement your own source dataset and a mechanism to select different images from it.
- Implement a pixelator in software that doesn’t use spatial coherence and compare the results with those obtained here.
{{< /hint >}}

El ejercicio se implementó utilizando el sketch y el shader proporcionado en [Spatial coherence](https://visualcomputing.github.io/docs/shaders/spatial_coherence/), haciendo los ajustes necesarios para poder seleccionar una entre las diferentes imagenes del dataset propio.

{{< hint info >}}
**Características** </br>
- El *slider* funciona para definir la resolución que va a tener la imagen, es decir la cantidad de pixeles que van a definir la imagen.
- El checkbox *video* para cambiar entre las imagenes y el video.
- El primer *select* sirve para seleccionar entre las opciones de pixelar o no la imagen o el video existente.
- El segundo *select* se usa para escoger la imagen que se va a mostrar, existen 4 opciones.
{{< /hint >}}

{{< p5-iframe sketch="/VisualComp/sketches/spaceCoherence.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

{{<details Code>}}
{{<highlight js>}}
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
image_src = loadImage(`/VisualComp/sketches/assets/spacePhotos/photo${photoA}.jpg`);
video_src = createVideo(['/VisualComp/sketches/assets/mapache.webm']);
video_src.hide();
mosaic = readShader('/VisualComp/sketches/shaders/spaceCoherence/spaceCoherence.frag',
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
    image_src = loadImage(`/VisualComp/sketches/assets/spacePhotos/photo1.jpg`);
    mosaic.setUniform('source', image_src);
    }
    else if (photoSelect.value() == 'Photo2'){
    image_src = loadImage(`/VisualComp/sketches/assets/spacePhotos/photo2.jpg`);
    mosaic.setUniform('source', image_src);
    }
    else if (photoSelect.value() == 'Photo3'){
    image_src = loadImage(`/VisualComp/sketches/assets/spacePhotos/photo3.jpg`);
    mosaic.setUniform('source', image_src);
    }
    else if (photoSelect.value() == 'Photo4'){
    image_src = loadImage(`/VisualComp/sketches/assets/spacePhotos/photo4.jpg`);
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
{{</highlight>}}
{{</details>}}

{{<details Shader-spaceCoherence.frag>}}
{{<highlight js>}}
precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D source;
// displays original
uniform bool original;
// target horizontal & vertical resolution
uniform float resolution;

// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)

void main() {
if (original) {
    gl_FragColor = texture2D(source, texcoords2);
}
else {
    // define stepCoord to sample the texture source as a 3-step process:
    // i. define stepCoord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 stepCoord = texcoords2 * resolution;
    // ii. remap stepCoord to [0.0, resolution] ∈ Z
    // see: https://thebookofshaders.com/glossary/?search=floor
    stepCoord = floor(stepCoord);
    // iii. remap stepCoord to [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution);
    // source texel
    gl_FragColor = texture2D(source, stepCoord);
    // ✨ source texels may be used to compute image palette lookup keys,
    // such as in video & photographic mosaics or ascii art visualizations.
}
}
{{</highlight>}}
{{</details>}}

## Conclusions and Future work

A partir del anterior trabajo se puede concluir que

- El uso de shaders permite aplicar algoritmos de pixelado en tiempo real, lo que significa que los cambios se pueden ver de inmediato en la imagen mientras se ajustan los parámetros. Esto brinda a los usuarios un mayor control y la capacidad de experimentar con diferentes estilos de pixelado para lograr el efecto deseado.

- El uso de shaders para el pixelado ofrece ventajas en términos de rendimiento. Al procesar los cálculos en la GPU en lugar de la CPU, se logra una mayor velocidad de procesamiento, lo que resulta especialmente útil al trabajar con imágenes de alta resolución o en aplicaciones en tiempo real, como videojuegos.

- El pixelado realizado mediante software tradicional a menudo implica aplicar filtros o realizar operaciones de muestreo en la imagen, lo que puede llevar más tiempo y requerir más recursos computacionales.

{{< expand "Referencias" "...">}}

## References

- https://visualcomputing.github.io/docs/shaders/spatial_coherence/

  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}