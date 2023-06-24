---
weight: 3
---

# Image processing

## Intro and Background

El uso de máscaras de convolución o el proceso de masking desempeña un papel fundamental en el ámbito del procesamiento de imágenes, ya que permite aplicar diversos efectos como desenfoque, nitidez, relieve, detección de bordes, entre otros. Estas máscaras son utilizadas para modificar la apariencia de una imagen mediante la convolución de una matriz de pesos sobre los píxeles de la imagen original.

Asimismo, las herramientas de ampliamiento de imágenes son empleadas en los computadores actuales, ya que permiten aumentar o reducir el tamaño de secciones específicas de una imagen. Estas herramientas son útiles para ajustar y retocar imágenes, mejorando la calidad visual y adaptándolas a diferentes propósitos.

En el desarrollo de la herramienta de ampliación de imágenes, se busca aumentar el tamaño aparente de una imagen sin alterar su perspectiva. Esta ampliación se mide mediante un número denominado "aumento", que representa la proporción entre el tamaño resultante y el tamaño original. 

Por último, las herramientas de luminosidad de color desempeñan un papel importante al ajustar el brillo de las imágenes a través de la aplicación de distintos modelos de color. Estas herramientas permiten controlar y modificar la intensidad de la luz en una imagen, lo que puede mejorar la visualización y resaltar ciertos detalles.

Para la herramienta de luminosidad se llevó a cabo la conversión entre el modelo de color RGBA y los siguientes modelos de color:

#### Luma:
Luma representa el brillo de una imagen (la parte "en blanco y negro" o acromática de la imagen), es decir, componente que codifica la información de luminosidad de la imagen. Representa la imagen acromática, mientras que los componentes del croma representan la información del color.
{{< katex display >}}
    Y' = 0.299R + 0.587G + 0.114B
{{< /katex >}}

#### HSL & HSV:

HSL (matiz, saturación, luminosidad) y HSV (matiz, saturación, valor; también conocido como HSB, matiz, saturación, brillo) son representaciones alternativas del modelo de color RGB que se ajustan mejor a cómo la visión humana percibe los atributos del color. Estos modelos organizan los colores en una franja radial según su matiz, alrededor de un eje central que va desde el negro en la parte inferior hasta el blanco en la parte superior.

![HSL & HSV coloring models.](https://crisvo2024.github.io/showcase/sketches/hsl_hsv.png)

La representación HSL es un modelo que permite entender cómo se combinan diferentes pinturas en el mundo real para crear colores. En este modelo, la luminosidad está relacionada con la presencia de blanco o negro en la mezcla de colores. Por ejemplo, al mezclar un pigmento rojo con pintura blanca se obtiene un "rojo claro", ya que la pintura blanca representa un valor alto de luminosidad en el modelo HSL. Los colores saturados se encuentran en un círculo alrededor de un valor de luminosidad de 0.5, mientras que un valor de luminosidad de 0 o 1 indica un color completamente negro o blanco, respectivamente.

Por otro lado, la representación HSV describe cómo los colores se perciben bajo la luz. La diferencia principal entre HSL y HSV es que, en HSL, el máximo valor de luminosidad corresponde al blanco puro, mientras que en HSV se asemeja a iluminar un objeto de color con luz blanca. Por ejemplo, al iluminar un objeto rojo con una luz blanca brillante, el objeto seguirá pareciendo rojo pero más brillante e intenso. En cambio, al iluminar ese mismo objeto rojo con una luz tenue, se verá más oscuro y menos brillante.

**Conversión RGB  a HSL:**
{{< katex display >}}
    Cmax = max(R, G, B)\\
    Cmin = min(R, G, B)\\
    \Delta = Cmax - Cmin
{{< /katex >}}

Calculo de la luminosidad:
{{< katex display >}}
    L = \frac{(Cmax+Cmin)}{2}
{{< /katex >}}

Calculo de la tonalidad (Hue):
{{< katex display >}}
    H = 
    \left\{
        \begin{array}{lr}
            0^\circ, & \text{if } \Delta = 0\\
            60^\circ * (\frac{G-B}{\Delta}mod6), & \text{if } Cmax = R\\
            60^\circ * (\frac{B-R}{\Delta}+2), & \text{if } Cmax = G\\
            60^\circ * (\frac{R-G}{\Delta}+4), & \text{if } Cmax = B
        \end{array}
    \right\}
{{< /katex >}}

Calculo de la saturación:
{{< katex display >}}
    S = 
    \left\{
        \begin{array}{lr}
            0^\circ, & \text{if } \Delta = 0\\
            \frac{\Delta}{1-|2L-1|}, & \text{if } Cmax = R
        \end{array}
    \right\}
{{< /katex >}}

**Conversión RGB  a HSV:**
Los calculos para la conversión de RGB a HSV son similares a los de HSL, el componente de tonalidad se calcula de la misma manera.

Calculo del brillo:
{{< katex display >}}
    V = Cmax
{{< /katex >}}

Calculo de la tonalidad (Hue): igual que en HSL.

Calculo de la saturación:
{{< katex display >}}
    S = 
    \left\{
        \begin{array}{lr}
            0^\circ, & \text{if } Cmax = 0\\
            \frac{\Delta}{Cmax}, & \text{if } Cmax \neq 0
        \end{array}
    \right\}
{{< /katex >}}

#### CIELAB:
El espacio de color CIELAB, también conocido como Lab*, fue definido por la Comisión Internacional de Iluminación (CIE) en 1976. Este espacio de color representa el color mediante tres valores: L* para la luminosidad perceptiva, y a* y b* para los componentes de color únicos de la visión humana, como el rojo, verde, azul y amarillo. El objetivo del CIELAB es ser un espacio perceptualmente uniforme, donde un cambio numérico específico se correlaciona con un cambio percibido similar en el color. Aunque no es completamente uniforme en términos de percepción, el espacio CIELAB es útil en la industria para detectar pequeñas diferencias de color.

Similar al espacio CIEXYZ del cual se deriva, el espacio de color CIELAB es un modelo independiente del dispositivo, conocido como "observador estándar". Los colores definidos en este espacio no están relacionados con un dispositivo específico, como un monitor de computadora o una impresora, sino que se basan en los resultados promedio de experimentos de coincidencia de colores realizados en condiciones de laboratorio utilizando el observador estándar de la CIE.

Para convertir de RGB a CIELAB, es necesario realizar una conversión primero de RGB a CIEXYZ y luego de CIEXYZ a CIELAB, como se indica a continuación.

**RGB a CIEXYZ:**
{{< katex display >}}
X_{tmp} = \left\{
        \begin{array}{lr}
            (\frac{R + 0.055}{1.055}^{2.4}), & \text{if } R > 0.04045\\
            R \div 12.92, & \text{otherwise}
        \end{array}
    \right\}\\
Y_{tmp} = \left\{
        \begin{array}{lr}
            (\frac{G + 0.055}{1.055}^{2.4}), & \text{if } G > 0.04045\\
            G \div 12.92, & \text{otherwise}
        \end{array}
    \right\}\\
Z_{tmp} = \left\{
        \begin{array}{lr}
            (\frac{B + 0.055}{1.055}^{2.4}), & \text{if } B > 0.04045\\
            B \div 12.92, & \text{otherwise}
        \end{array}
    \right\}\\
{{< /katex >}}

Finalmente tenemos:

{{< katex display >}}
\begin{bmatrix}
    X\\
    Y\\
    Z
\end{bmatrix} = 
100 * 
\begin{bmatrix}
    X_{tmp}\\
    Y_{tmp}\\
    Z_{tmp}
\end{bmatrix} *
\begin{bmatrix}
    0.4124 & 0.3576 & 0.1805\\
    0.2126 & 0.7152 & 0.0722\\
    0.0193 & 0.1192 & 0.9505
\end{bmatrix}
{{< /katex >}}

**CIEXYZ a CIELAB:**

{{< katex display >}}
n = \begin{bmatrix}
    X\\
    Y\\
    Z
\end{bmatrix} \ div
\begin{bmatrix}
    95.047\\
    100\\
    108.883
\end{bmatrix}\\
{{< /katex >}}
Definimos un vextor **v** de tamaño 3 de tal manera que cada una de sus componentes se definen como:

{{< katex display >}}
v_0 = \left\{
        \begin{array}{lr}
            n_0^{\frac{1}{3}}, & \text{if } n_0 > 0.008856\\
            ( 7.787 * n_0 ) + ( \frac{16.0}{116.0} ), & \text{otherwise}
        \end{array}
    \right\}\\

v_1 = \left\{
        \begin{array}{lr}
            n_1^{\frac{1}{3}}, & \text{if } n_1 > 0.008856\\
            ( 7.787 * n_1 ) + ( \frac{16.0}{116.0} ), & \text{otherwise}
        \end{array}
    \right\}\\

v_0 = \left\{
        \begin{array}{lr}
            n_2^{\frac{1}{3}}, & \text{if } n_2 > 0.008856\\
            ( 7.787 * n_2 ) + ( \frac{16.0}{116.0} ), & \text{otherwise}
        \end{array}
    \right\}
{{< /katex >}}

Finalmente el resultado sería:
{{< katex display >}}
\begin{bmatrix}
    L\\
    A\\
    B
\end{bmatrix} = 
\begin{bmatrix}
    ( 116.0 * v_1 ) - 16.0\\
    500.0 * ( v_0 - v_1 )\\
    200.0 * ( v_1 - v_2 )
\end{bmatrix}
{{< /katex >}}

## Code and Results

{{< hint info >}}
**Exercise** </br>
Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:

* A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
* A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
* Integrate luma and other coloring brightness tools. </br>
What other shader tools would you implement?
{{< /hint >}}

Dentro del siguiente código se aplicaron todas las características definidas dentro del ejercicio utilizando un shader diferente por cada característica, uno para la región de interés y el ampliamiento de imagen, otro para las máscaras de convolución y otro para las herramientas de luminosidad de color.

Para el caso de las máscaras de convolución se envía desde el sketch hacia el shader la matriz que define la máscara que será aplicada, para luego iterar sobre cada píxel en la imágen o el video y aplicar esta máscara en este. En caso de solo requerir la región de interés, esta máscara se aplica solo en esta región.</br>
Para el caso del ampliamiento de imágen se utilizó el shader disponible en [ShaderToy](https://www.shadertoy.com/view/llsSz7), modificándolo para no aumentar en caso de tener la región de interés. </br>
Por último para las herramientas de luminosidad de color, se hace un cambio a cada pixél resultante de la aplicación de las máscaras de convolución depenciendo de la herramienta que se deseara aplicar. En este caso se realiza un cálculo con los colores rgb presentes y se retornan estos valores para ser pintados.

{{< hint info >}}
**Características**
* Presiona el checkbox *video* para cambiar entre la imagen y el video.
* El primer *select* sirve para seleccionar las diferentes herramientas de luminosidad de color, se puede escoger entre ninguna (None), Luma, HSV, HSL y CIELAB.
* El siguiente *select* sirve para escoger la máscara de convolución a aplicar, por defecto no se le aplicará ninguna (Identity), pero se puede escoger entre Ridge detection, Sharpen, Blur, Convolution, Unsharp masking y Gaussian blur.
* A continuación se tiene el *select* entre el ampliamiento de la imagen (Magnifier) o la región de interés (Region of interest)
* Por último se presentan dos *sliders*, el primero es para modificar el tamaño del circulo que define el magnifier o la región de interés. Y el segundo sirve para modificar el ampliamiento a la imagen en el caso de que esté seleccionada la opción de Magnifier
{{< /hint >}}

{{< p5-iframe sketch="/VisualComp/sketches/imgProcessing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

{{<details Code>}}
{{<highlight js>}}
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
maskShader = readShader('/VisualComp/sketches/shaders/imgProcessing/mask.frag',
    { varyings: Tree.texcoords2 });
lumaShader = readShader('/VisualComp/sketches/shaders/imgProcessing/bright.frag',
    { varyings: Tree.texcoords2 });
lensShader = readShader('/VisualComp/sketches/shaders/imgProcessing/lens.frag',
    { varyings: Tree.texcoords2 });
video_src = createVideo(['/VisualComp/sketches/assets/mapache.webm']);
video_src.hide();
img_src = loadImage('/VisualComp/sketches/assets/aiImage1.jpg');
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
    matrix = [ 1/256,  4/256,  6/256,  4/256, 1/256,
                4/256, 16/256, 24/256, 16/256, 4/256,
                6/256, 24/256, 36/256, 24/256, 6/256,
                4/256, 16/256, 24/256, 16/256, 4/256,
                1/256,  4/256,  6/256,  4/256, 1/256 ];
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
{{</highlight>}}
{{</details>}}

{{<details Shader-bright.frag>}}
{{<highlight js>}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform float brightTool;
uniform sampler2D texture;

// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)

float get_hs(float r, float g, float b, float cMax, float cMin, bool flag, float val) {
float h = 0.0;
float s = 0.0;

if ( cMax > cMin ) {
    float cDelta = cMax - cMin;

    if(flag){
        s = val < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
    } else {
        s = cMax == 0.0 ? 0.0 : cDelta / cMax;
    }

    if ( r == cMax ) {
        h = ( g - b ) / cDelta;
    } else if ( g == cMax ) {
        h = 2.0 + ( b - r ) / cDelta;
    } else {
        h = 4.0 + ( r - g ) / cDelta;
    }

    if ( h < 0.0) {
        h += 6.0;
    }
    
    h = h / 6.0;
}
return h, s;
}

// returns hls of given texel
float apply_hsl(vec3 texel) {
float r = texel.r;
float g = texel.g;
float b = texel.b;
float cMin = min( r, min( g, b ) );
float cMax = max( r, max( g, b ) );

float l = ( cMax + cMin ) / 2.0;
float h, s = get_hs(r, g, b, cMax, cMin, true, l);
return h, s, l;
}

// returns hsv of given texel
float apply_hsv(vec3 texel) {
float r = texel.r;
float g = texel.g;
float b = texel.b;
float cMin = min( r, min( g, b ) );
float cMax = max( r, max( g, b ) );

float v = cMax;
float h, s = get_hs(r, g, b, cMax, cMin, false, v);
return h, s, v;
}

// ------------------------- RGB TO CIELAB -------------------

vec3 rgb2xyz (vec3 texel) {
vec3 tmp;
tmp.x = ( texel.r > 0.04045 ) ? pow( ( texel.r + 0.055 ) / 1.055, 2.4 ) : texel.r / 12.92;
tmp.y = ( texel.g > 0.04045 ) ? pow( ( texel.g + 0.055 ) / 1.055, 2.4 ) : texel.g / 12.92,
tmp.z = ( texel.b > 0.04045 ) ? pow( ( texel.b + 0.055 ) / 1.055, 2.4 ) : texel.b / 12.92;
const mat3 mat = mat3(
    0.4124, 0.3576, 0.1805,
    0.2126, 0.7152, 0.0722,
    0.0193, 0.1192, 0.9505 
);
return 100.0 * tmp * mat;
}

vec3 xyz2lab (vec3 xyz) {
    vec3 n = xyz / vec3(95.047, 100, 108.883);
    vec3 v;
    v.x = ( n.x > 0.008856 ) ? pow( n.x, 1.0 / 3.0 ) : ( 7.787 * n.x ) + ( 16.0 / 116.0 );
    v.y = ( n.y > 0.008856 ) ? pow( n.y, 1.0 / 3.0 ) : ( 7.787 * n.y ) + ( 16.0 / 116.0 );
    v.z = ( n.z > 0.008856 ) ? pow( n.z, 1.0 / 3.0 ) : ( 7.787 * n.z ) + ( 16.0 / 116.0 );
    return vec3(( 116.0 * v.y ) - 16.0, 500.0 * ( v.x - v.y ), 200.0 * ( v.y - v.z ));
}

vec3 apply_lab(vec3 texel){
    return xyz2lab(rgb2xyz(texel));
}

// returns luma of given texel
vec3 luma(vec4 texel) { 
//Luma
if (brightTool == 2.0){
    return vec3(0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b);}
//HSV value V
else if (brightTool == 3.0){
    return vec3(apply_hsv(texel.rgb));}
//HSL lightness L
else if (brightTool == 4.0){
    return vec3(apply_hsl(texel.rgb));}
//CIELAB
else if (brightTool == 5.0){
    return apply_lab(texel.rgb);}
}

void main() {
// texture2D(texture, texcoords2) samples texture at texcoords2 
// and returns the normalized texel color
vec4 texel = texture2D(texture, texcoords2);
gl_FragColor = brightTool == 1.0 ? texel : vec4(luma(texel), 1.0);
}
{{</highlight>}}
{{</details>}}

{{<details Shader-lens.frag>}}
{{<highlight js>}}
precision mediump float;

uniform sampler2D texture;

varying vec2 texcoords2;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float lens_radius;
uniform float magnification;
uniform bool roi;

// Inspired by https://www.shadertoy.com/view/4tdXDl.
void main()
{   
    vec2 uv = gl_FragCoord.xy / iResolution.y;
    
    //at the beginning of the sketch, center the magnifying glass.
    //Thanks to FabriceNeyret2 for the suggestion
    vec2 mouse = iMouse.xy;
    if (mouse == vec2(0.0))
        mouse = iResolution.xy / 2.0;
    
    //UV coordinates of mouse
    vec2 mouse_uv = mouse / iResolution.y;
    
    //Distance to mouse
    float mouse_dist = distance(uv, mouse_uv);
    
    //Draw the texture
    gl_FragColor = texture2D(texture, uv);

    if (!roi){
        //Draw the outline of the glass
    if (mouse_dist < lens_radius + 0.01)
        gl_FragColor = vec4(1., 1., 1., 1.);

    //Draw a zoomed-in version of the texture
    if (mouse_dist < lens_radius)
        gl_FragColor = texture2D(texture, mouse_uv - (mouse_uv - texcoords2) / magnification);
    }
}
{{</highlight>}}
{{</details>}}

{{<details Shader-mask.frag>}}
{{<highlight js>}}
precision mediump float;

uniform sampler2D texture;
// see the emitTexOffset() treegl macro
// https://github.com/VisualComputing/p5.treegl#macros
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[100];
uniform float customLen;
// we need our interpolated tex coord
varying vec2 texcoords2;
uniform bool roi;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float lens_radius;

void main() {

// Sample texel neighbours within the rgba array
vec4 rgba[100];

for (int i = 0; i < 100; i++) {
    if (float(i) == customLen){
    break;
    }
    rgba[i] = texture2D(texture, texcoords2 + vec2(-texOffset.s*floor(sqrt(customLen)/2.0) + texOffset.s*mod(float(i),sqrt(customLen)), -texOffset.t*floor(sqrt(customLen)/2.0) + texOffset.t*floor(float(i)/sqrt(customLen))));
}

// 3. Apply convolution kernel
vec4 convolution;
for (int i = 0; i < 100; i++) {
    if (float(i) == customLen){
    break;
    }
    convolution += rgba[i]*mask[i];
}

if (roi){
    
    vec2 uv = gl_FragCoord.xy / iResolution.y;
    
    //at the beginning of the sketch, center the magnifying glass.
    //Thanks to FabriceNeyret2 for the suggestion
    vec2 mouse = iMouse.xy;
    if (mouse == vec2(0.0))
        mouse = iResolution.xy / 2.0;
    
    //UV coordinates of mouse
    vec2 mouse_uv = mouse / iResolution.y;
    
    //Distance to mouse
    float mouse_dist = distance(uv, mouse_uv);
    
    gl_FragColor = texture2D(texture, texcoords2);
    
    //Draw the outline of the glass
    if (mouse_dist < lens_radius + 0.01)
        gl_FragColor = vec4(1., 1., 1., 1.);
    
    //Draw a zoomed-in version of the texture
    if (mouse_dist < lens_radius)
        gl_FragColor = vec4(convolution.rgb, 1.0); 
}

else {
// 4. Set color from convolution
gl_FragColor = vec4(convolution.rgb, 1.0); 
}
}
{{</highlight>}}
{{</details>}}

## Conclusions and Future work

A partir del trabajo anterior se puede concluir que:

- El uso de máscaras de convolución permite aplicar efectos como desenfoque, nitidez, relieve y detección de bordes, brindando opciones versátiles para ajustar la apariencia de las imágenes según las necesidades del usuario.

- Las herramientas de luminosidad ofrecen la capacidad de ajustar el brillo y el contraste de las imágenes, permitiendo resaltar detalles y mejorar la visualización.

- La incorporación de una lupa en el software proporciona una funcionalidad adicional al permitir ampliar secciones específicas de una imagen, facilitando el análisis de detalles minuciosos y el trabajo de precisión.

- Este tipo de manipulaciones es especialmente útil en campos como el diseño gráfico, la fotografía y la investigación científica, donde la calidad y el análisis detallado de las imágenes son fundamentales.

Como trabajo futuro se pueden aplicar otras máscaras de convolución y otras herramientas de luminosidad a las imagenes, además de dar la posibilidad de poder utilizar imagenes o videos que suba el mismo usuario. Por otro lado también sería bueno explorar otras herramientas de shaders que puedan ser aplicadas a imágenes.

{{< expand "Referencias" "...">}}

## References

- https://visualcomputing.github.io/docs/shaders/spatial_coherence/
- https://www.shadertoy.com/view/wsfBz8
- https://en.wikipedia.org/wiki/Region_of_interest
- https://en.wikipedia.org/wiki/HSL_and_HSV
- https://setosa.io/ev/image-kernels/

  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}