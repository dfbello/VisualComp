---
weight: 4
---

# Procedural Texturing

## Intro and Background

El texturizado procedimental es una técnica utilizada en gráficos por computadora y diseño de videojuegos para generar texturas de manera automática y algorítmica, en lugar de depender de imágenes almacenadas directamente. En lugar de utilizar datos de imagen, se emplea una descripción matemática o un algoritmo para generar la textura deseada, lo que permite su mapeo en diferentes formas. Esta técnica es especialmente útil para modelar superficies o volúmenes que imitan elementos naturales como madera, mármol, granito, metal, piedra y otros materiales.

Los algoritmos se definen mediante parámetros y reglas que describen cómo la textura debe generarse de manera procedural, considerando aspectos como el color, la forma, la repetición y la variación. Este enfoque ofrece mayor flexibilidad y control en la creación de texturas, permitiendo obtener resultados personalizados y ajustables según las necesidades del proyecto.

## Code and Results

{{< hint info >}}
**Exercise** </br>
Adapt other patterns from the book of shaders (refer also to the shadertoy collection) and map them as textures onto other 3D shapes.
{{< /hint >}}

Dentro de este ejercicio se utilizaron diferentes shaders para representar los diferentes patrones que se pueden realizar, sin embargo en este caso solo se utiliza un shader a la vez, y no varios efectos al tiempo como en otros ejercicios de shaders. Dentro del código se permite escoger cada textura y se aplica el shader escogido y enviarle la información necesaria; además para la figura, simplemente dependiendo de la escogida, esta será la figura que se va a dibujar.

{{< hint info >}}
**Características**
* El primer *select* sirve para seleccionar el patrón de texturas que se desea aplicar a la figura, se puede escoger entre Tiles, Bricks, Color y Plasma.
* El segundo *select* se usa para escoger la figura a la que se le desea plicar la textura escogida, las opciones disponibles son Box, Torus, Sphere, Cylinder y Cone.
* Al mover el mouse en el eje X se modifica la resolución que tiene la textura dentro de la figura, por lo que el patrón se repetirá más veces si el mouse se encuentra más a la derecha.
{{< /hint >}}

{{< p5-iframe sketch="/VisualComp/sketches/proceduralTexturing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="525" height="525" >}}

{{<details Code>}}
{{<highlight js>}}
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
{{</highlight>}}
{{</details>}}

{{<details Shader-bricks.frag>}}
{{<highlight js>}}
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    // st /= vec2(2.15,0.65)/1.5;

    // Apply the brick tiling
    st = brickTile(st, u_zoom);

    color = vec3(box(st,vec2(0.9)));

    // Uncomment to see the space coordinates
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
{{</highlight>}}
{{</details>}}

{{<details Shader-color.frag>}}
{{<highlight js>}}
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                        _radius+(_radius*0.01),
                        dot(l,l)*4.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st *= u_zoom;      // Scale up the space by 3
    st = fract(st); // Wrap around 1.0

    // Now we have 9 spaces that go from 0-1

    color = vec3(st,0.0);
    //color = vec3(circle(st,0.5));

    gl_FragColor = vec4(color,1.0);
}
{{</highlight>}}
{{</details>}}

{{<details Shader-plasma.frag>}}
{{<highlight js>}}
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                        vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float cellular(vec2 p) {
    vec2 i_st = floor(p);
    vec2 f_st = fract(p);
    float m_dist = 10.;
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin(6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            if( dist < m_dist ) {
                m_dist = dist;
            }
        }
    }
    return m_dist;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    st *= 5.0;
    float r = cellular(st);
    float b = cellular(st - vec2(0.0, sin(u_time * 0.5) * 0.5));
    gl_FragColor = vec4(r, 0.0, b, 1.0);
}
{{</highlight>}}
{{</details>}}

{{<details Shader-tiles.frag>}}
{{<highlight js>}}
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.
//
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st, u_zoom);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.25);

    // Draw a square
    color = vec3(box(st,vec2(0.7),0.01));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
{{</highlight>}}
{{</details>}}

## Conclusions and Future work

A partir del trabajo anterior se puede concluir que:

- El enfoque procedimental permite crear texturas detalladas y complejas mediante algoritmos matemáticos, en lugar de depender de imágenes preexistentes. Esto brinda un alto grado de control y flexibilidad en la creación de texturas, ya que se pueden ajustar parámetros y reglas para obtener resultados adaptados a las necesidades específicas de cada figura 3D.

- El texturizado procedimental ofrece la posibilidad de simular una amplia variedad de materiales y superficies, desde elementos naturales como madera, mármol y piedra, hasta texturas más abstractas o fantásticas. Esto proporciona a los diseñadores y artistas la capacidad de dar vida a sus creaciones en 3D con un nivel de detalle y realismo impresionante.

- El texturizado procedimental facilita la generación de variaciones y repeticiones de texturas, lo que resulta especialmente útil en la creación de mundos virtuales, escenas de videojuegos y animaciones. La capacidad de generar texturas automáticamente agiliza el proceso de desarrollo y permite la creación de contenido visualmente atractivo en menos tiempo.

Como trabajo futuro se pueden implementar muchas más texturas de diferentes formas que se asemejen más a materiales y superficies de la vida real. Además de poder aplicar estas texturas en otras figuras que sean mucho más complejas.

{{< expand "Referencias" "...">}}

## References

- https://en.wikipedia.org/wiki/Procedural_texture
- https://thebookofshaders.com/09/
  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}