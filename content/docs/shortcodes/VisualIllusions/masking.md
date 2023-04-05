---
weight: 3
---

# Masking

## Intro and background

El visual masking es un fenómeno de percepción visual que ocurre cuando la visibilidad de una imagen, llamada objetivo, es reducida por la presencia de otra imagen que se superpone, llamada máscara.

Los patrones de Moiré son patrones de interferencia que aparecen cuando dos o más patrones de líneas se superponen y no están perfectamente alineados. Este efecto se produce cuando se colocan dos rejillas con patrones de líneas finas una encima de la otra, de tal manera que las líneas de una rejilla no están perfectamente alineadas con las líneas de la otra rejilla. Como resultado, se produce una interferencia entre los patrones de líneas, lo que crea un patrón de ondulación o un efecto de malla en la imagen resultante.

## Code and results

### Moire Patterns

Para estos patrones se hizo uso de varias formas en grupos en donde se supeponen entre ellas para generar una nueva forma o patrón en el interior.

#### Patrón de círculos

En este caso se van a utilizar patrones con círculos para crear efectos ondulatorios al superponer dos series de círculos con el mismo espacio entre ellos, donde uno se mueve a lo largo del canvas mientras que el otro se mantiene estático. De esta manera se genera un patrón de moire.

{{<details relevantCode open>}}
function setup() {
createCanvas(400, 400);
}

        function draw() {
        noFill();
        strokeWeight(ringWidth);
        for (let i = 0; i < numRings; i++) {
            let radius = i * ringSpacing + ringWidth / 2;
            ellipse(width / 2, height / 2, radius * 2, radius * 2);
        }
        for (let i = 0; i < numRings; i++) {
            let radius = i * ringSpacing + ringWidth / 2;
            ellipse(xVar, height / 2, radius * 2, radius * 2);
        }
        }

{{</details>}}

En este caso es posible modificar la velocidad a la que se mueve el segundo grupo de circulos dentro del canvas.

{{< p5-iframe sketch="/showcase/sketches/moirePattern1.js" width="425" height="425">}}

{{<details Code>}}
let xVar = 200
let numRings = 40; // number of rings
let ringSpacing = 5; // spacing between rings
let ringWidth = 2; // width of each ring
let ringColor = [255, 0, 0]; // color of rings
let speedSlider;
let speed = 0.5;
let direction = true;

        function setup() {
        createCanvas(400, 400);
        speedSlider = createSlider(0, 10, 5, 1);
        speedSlider.position(10,10);
        speedSlider.style("width", "80px");
        }

        function draw() {
        background(255);

        // draw rings
        noFill();
        strokeWeight(ringWidth);
        //stroke(ringColor);
        for (let i = 0; i < numRings; i++) {
            let radius = i * ringSpacing + ringWidth / 2;
            ellipse(width / 2, height / 2, radius * 2, radius * 2);
        }
        for (let i = 0; i < numRings; i++) {
            let radius = i * ringSpacing + ringWidth / 2;
            ellipse(xVar, height / 2, radius * 2, radius * 2);
        }
        maxRadius = numRings*ringSpacing + ringWidth / 2;
        if (direction){
            xVar += speedSlider.value()/10;
        }
        else {
            xVar -= speedSlider.value()/10;
        }
        if (xVar + maxRadius > width + 50){
            direction = false
        }
        else if (xVar - maxRadius < -50){
            direction = true
        }
        }

{{</details>}}

#### Patrón de lineas paralelas

Dentro del siguiente código se tienen dos grupos de lineas paralelas, unas están fijas mientras que las otras van rotando desde el centro. Esto genera un efecto que crea la ilusión de generación de rombos de diferentes tamaños dependiendo del ángulo de giro del segundo grupo de lineas.

{{<details relevantCode open>}}
function setup() {
createCanvas(500, 500);
}

        function draw() {
            background(255);
            for (let y = 0; y < height; y += 10) {
                line(0, y, width, y);
            }
            push();
            translate(width/2, height/2);
            rotate(angle);
            for (let y = -height; y < height; y += 10) {
                line(-width/2, y, width/2, y);
            }
            pop();
        }

{{</details>}}

{{< p5-iframe sketch="/showcase/sketches/moirePattern3.js" width="525" height="525">}}

{{<details Code>}}
let angle = 0;
function setup() {
createCanvas(500, 500);
angleMode(DEGREES);
strokeWeight(3);
}

        function draw() {

        }

{{</details>}}

#### Patrón de líneas espaciadas

{{< p5-iframe sketch="/showcase/sketches/moirePattern4.js" width="600" height="600" >}}

{{< details Code>}}

    let gridSpacing;
    let slider;


    function setup() {
        createCanvas(575,575);
        slider = createSlider(1,30,6,1);
        slider.position(10,10);
        stroke(255,255,255);
    }

    function draw() {
        background(0,0,0);
        gridSpacing = slider.value();
        for(i = 0; i<width; i ++){
            line(gridSpacing * i, 0, 0, height);
        }
    }

{{</details>}}

#### Kinegrama

El siguiente kinegrama se genera a partir de una imágen preestablecida que se muestra dentro del mismo programa al hacer clic en el canvas de la misma. Sobre esta imagen, a forma de mascara, se coloca una capa de líneas que van de arriba a abajo y que revelan el contenido de la imagen de debajo, que sería el objetivo

{{<details relevantCode open>}}

        function preload() {
                img = loadImage("/showcase/sketches/assets/kinegram.png");
        }
        function setup() {
                createCanvas(400, 420);
        }
        function draw() {
                image(img,0,0);
                for(let i = -height/rectLen; i < 0; i+=spacing){
                fill("black");
                rect(0,i\*rectLen+y,width,rectLen);
                }
                y += rectSpeed;
                if ((-height+y) >= height) {
                y = 0;
                }
        }
        
{{</details>}}

Esta imagen está hecha aparte y no se calcula dentro del programa, sin embargo es posible realizar un programa que calcule la imagen objetivo a partir de un gif o una serie de imagenes que se quieran visualizar de esta manera.

{{< p5-iframe sketch="/showcase/sketches/kinegram.js" width="425" height="445">}}

{{<details Code>}}
        
        let img;
        let rectSpeed = 0.5;
        let rectLen = 10;
        let spacing = 1.2;
        let y = 0;

                function preload() {
                    img = loadImage("/showcase/sketches/assets/kinegram.png");
                }

                function setup() {
                    createCanvas(400, 420);
                }

                function draw() {
                    background(255);
                    image(img,0,0);
                    for(let i = -height/rectLen; i < 0; i+=spacing){
                        fill("black");
                        rect(0,i*rectLen+y,width,rectLen);
                    }
                    y += rectSpeed;
                    if ((-height+y) >= height) {
                        y = 0;
                    }
                    if(mouseIsPressed){
                        background(255);
                        image(img,0,0);
                    }
                }

{{</details>}}

### Dithering

El dithering es una forma intencional de aplicar ruido, usada para aleatorizar el error de cuantificación y de esta manera evitar patrones a gran escala como color banding en las imágenes. Dither es utilizado en diferentes campos donde ocurre procesamiento y análisis de señales digitales.

En el procesamiento de imágenes digitales es usado para generar profundidad de color en situaciones donde la paleta de colores es limitada. Los colores no existentes en la paleta se aproximan por una difusión de píxeles dentro de la gama de colores disponibles. El siguiente ejemplo muestra como se produce un amarillo a partir de rojo y verde. Use el slider parra hacer la rejilla mas pequeña, donde se empieza a apreciar el efecto.

{{< p5-iframe sketch="/showcase/sketches/dithering.js" width="625" height="625">}}

{{<details Code>}}

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

{{</details>}}

### Image kernel

En este caso se tiene un procesador de imágenes que soporta diferentes kernels de imágenes con su respectivo histograma y su cambio de brillo.
En este caso se puede subir cualquier imagen que se desee modificar y se mostrará esta imagen original al lado de la imagen modificada con los kernels que se escojan, además que el histograma se muestra siempre con la imagen modificada.
Se debe tener en cuenta que este histograma representa la cantidad de pixeles que tienen un mismo valor tonal, es decir la oscuridad o brillo, dentro de la imagen; es por esto que se genera un total de 256 líneas.

Cada uno de los diferentes kernels se pude escoger con el desplegable que se encuentra a la izquierda, mientras que se necesitan presionar las teclas "+" o "-" para cambiar el brillo de la imagen en cuestión.

{{< p5-iframe sketch="/showcase/sketches/kernelImages.js" width="625" height="625">}}

## Conclusions and future work

A partir del anterior trabajo se puede concluir que

- Los patrones de moire y los kinegramas son formas muy sencillas de hace ilusiones visuales al utilizar dos elementos en el que uno cubre al otro para general nuevas figuras a partir de lo que se quiere mostrar

- Se pueden formar infinidad de patrones de moire con muchas figuras de diferentes formas y tamaños, sin embargo dentro de la más estudiadas se encuentran las formas más básicas como círculos o lineas

- Un kinegrama tiene grandes aplicaciones en la realización de movimientos a partir de una imagen base, la cual puede ser calculada a partir de alguna serie de imagenes existentes.

- El procesamiento de imagenes kernel es util cuando se requiere hacer un calculo más específico de algunas características que pueda tener la imagen en cuestión.

Como trabajo futuro se espera poder implementar más patrones de moire mucho más complejos y que creen fiiguras más interesantes para el ojo humano. Además de generar la imágen objetivo de un kinegrama a partir de un gif o de varias imagenes en secuencia.</br>
Por último se espera que dentro de los kernel de imagenes se pueda aplicar el mismo modelo a un video en tiempo real.

{{< expand "Referencias" "...">}}

## Referencias

- https://en.wikipedia.org/wiki/Visual_masking
- https://www.sciencedirect.com/topics/medicine-and-dentistry/visual-masking
- https://www.britannica.com/science/moire-pattern
- https://en.wikipedia.org/wiki/Kernel_(image_processing)
- https://setosa.io/ev/image-kernels/
- https://en.wikipedia.org/wiki/Dither

  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}
