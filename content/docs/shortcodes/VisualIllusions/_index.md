---
bookCollapseSection: true
weight: 2
---

# Optical ilusions

## Introducción y antecedentes

Una ilusión óptica es una ilusión del sentido de la visión en la cual se puede percibir la realidad de varias formas, de manera que se engaña el sistema visual, desde el ojo al cerebro, y permite que se perciba la realidad de una forma distorsionada. Estas ilusiones pueden tomar muchas formas y pueden ser causadas por diferentes factores, como la forma en que el cerebro procesa la información visual, la iluminación, el contraste y la perspectiva. 

Esto ocurre debido a que el cerebro crea una percepción del mundo, por lo que en muchas ocasiones rellena ciertos huecos cuando la información que ve está incompleta o crea imágenes que no se encuentran allí. Esto debido a la evolución que ha tenido el sentido de la vista humano para sobrevivir, ya que el cerebro toma todas las piezas que pueda obtener a su a su alrededor y hace lo posible para deducir el resto.

Este fenómeno se ha estudiado por muchos campos, iniciando por la ciencia, la cual se usa principalmente para evaluar la forma en la que el ojo y el cerebro perciben ciertos elementos de su entorno. </br>
Sin embargo es probable que el uso más reconocido de este tipo de ilusiones sea en el arte, ya que se aprovechan de estas para generar impresión de movimiento, o imágenes y patrones ocultos. Desde artistas reconocidos como Salvador Dalí o Charles Gilbert han hecho uso de este tipo de ilusiones para su arte. Una muestra de ello es la siguiente imagen de Charles Gilbert llamada todo es vanidad (1892)

<p align="center">
    <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Allisvanity.jpg/220px-Allisvanity.jpg">
</p>

O esta de Salvador Dalí llamada Tres edades (1940)

<p align="center">
    <img src= "https://www.thedaliuniverse.com/sites/default/files/styles/full_width/public/images/salvador-dali-painting/the_three_ages/front/the_three_ages.jpg?itok=ryidI33e">
</p>

## Code and results

Para resover este problema se ha hecho la implementación de algunas ilusiones que hacen uso de diferentes métodos para generar estas ilusiones

### Ilusión de movimiento por pasos

{{<details RelevantCode open>}}
    function setup() {
      createCanvas(600, 300);
    }

    function draw() {
      let len = 10;
      for(let i = 0;i<width/len;i++){
        fill("black");
        if(i%2 === 0){
          rect(i*len,height,len,-height);
        }
      }
      fill("white");
      rect(xPos,80,100,40);
      fill("black");
      rect(xPos,180,100,40);
      xPos += rectSpeed;
      if(xPos+100 >= width || xPos <= 0){
          rectSpeed*=-1;
        }
    }
{{</details>}}

Dentro del siguiente ejercicio se visualiza un movimiento de unos rectángulos que aparentan moverse paso a paso, sin embargo esto no es verdad, ya que estos se mueven constantemente. Esto se puede comprobar al dar clic izquierdo en el canvas, donde se quitarán las líneas y se verá que efectivamente estos rectángulos se mueven constantemente.

{{<details Code>}}
    let rectSpeed = 0.6;
    let xPos = 0;
    let colorCheck;
    function setup() {
      createCanvas(600, 300);
      colorCheck = createCheckbox(" Cambiar color", false);
      colorCheck.position(12,10);
      colorCheck.style("color", "blue");
      colorCheck.style("backgroundColor", "gray");
      colorCheck.style("padding", "3px");
    }

    function draw() {
      background(255);
      let len = 10;
      for(let i = 0;i<width/len;i++){
        fill("black");
        if(i%2 === 0){
          rect(i*len,height,len,-height);
        }
      }
      if(mouseIsPressed){
        background(50);
      }
      noStroke();
      if (colorCheck.checked()){
        push();
      fill("yellow");
      rect(xPos,80,100,40);
      fill("blue");
      rect(xPos,180,100,40);
      pop();
      } else {
        push();
        fill("white");
        rect(xPos,80,100,40);
        fill("black");
        rect(xPos,180,100,40);
        pop();
      }
      
      xPos += rectSpeed;
      if(xPos+100 >= width || xPos <= 0){
          rectSpeed*=-1;
        }
    }
{{</details>}}

{{< p5-iframe sketch="/showcase/sketches/stepVisualIllusions.js" width="625" height="325" >}}

Este efecto es causado principalmente por el efecto de contraste, el cual se refiere a las diferencias de luminancia tanto del fondo como de los objetos móviles, de manera que esta diferencia hace que el ojo perciba que cada objeto se mantiene en el contraste que mejor le queda del fondo, haciendo parecer que se mueva por pasos. Esto también permite ver la amplitud del movimiento y depende de los códigos visuales para el movimiento que tiene el cerebro.

Por esto mismo en este caso es necesario que los elementos móviles tengan contrastes diferentes entre sí, ya que entre mayor sea su diferencia de luminancia, más fácil será ver el efecto. Es por ello que en algunos caso se puede ver este ejemplo con móviles de color amarillo y azul, ya que existe un alto contraste entre ellos pero se dificulta un poco más de ver que con el blanco y el negro.

### Ilusión yellow-inducing

{{<details RelevantCode open>}}
      function setup() {
        createCanvas((tamano*2), tamano);
        colorMode(RGB,1)
        frameRate(100)
      }
      function draw() {  
        dibujoCuadrado(0,0,color(4/255, 252/255, 4/255))
        dibujoCuadrado(tamano,0,color(4/255, 252/255, 252/255))
        dibujoElipse(tamano/2,tamano/2,color(1,1,1))
        dibujoElipse(tamano+(tamano/2),tamano/2,color(1,1,1))
      }
      function dibujoElipse(x,y,tinte){
        fill(tinte);
        ellipse(x,y,tamano/2,tamano/2);
      }
      function dibujoCuadrado(x,y,tinte){
        fill(tinte);
        rect(x,y,tamano,tamano);
      }
      function cuadricula(x,y,tinte){ 
        for(i=0;i < tamano;i++){
          fill(color(0,0,0,0));
          rect(x,i,tamano,espacio);
          fill(tinte);
          rect(x,i+10,tamano,grueso)
          i=i+(espacio-1)    
        }
        for(i=x;i < x+tamano;i++){
          fill(color(0,0,0,0));
          rect(i,y,espacio,tamano);
          fill(tinte);
          rect(i+10,y,grueso,tamano)
          i=i+(espacio-1)    
        }
      }

{{</details>}}

{{<details Code>}}
    var tamano=200

    function setup() {
      createCanvas((tamano*2), tamano);
      colorMode(RGB,1)
      frameRate(100)
    }

    function draw() {  
      dibujoCuadrado(0,0,color(4/255, 252/255, 4/255))
      dibujoCuadrado(tamano,0,color(4/255, 252/255, 252/255))
      dibujoElipse(tamano/2,tamano/2,color(1,1,1))
      dibujoElipse(tamano+(tamano/2),tamano/2,color(1,1,1))
      if (!mouseIsPressed){ 
      cuadricula(0,0,color(4/255, 252/255, 252/255))
      cuadricula(tamano,0,color(4/255, 252/255, 4/255))}
      console.log(frameRate);
    }
    function dibujoElipse(x,y,tinte){
      push();
      noStroke();
      fill(tinte);
      ellipse(x,y,tamano/2,tamano/2);
      pop();
    }
    function dibujoCuadrado(x,y,tinte){
      push();
      noStroke();
      fill(tinte);
      rect(x,y,tamano,tamano);
      pop();
    }
    function cuadricula(x,y,tinte){
      push();
      noStroke();
      grueso=tamano/80
      espacio=tamano/20  
      for(i=0;i<tamano;i++){
        fill(color(0,0,0,0));
        rect(x,i,tamano,espacio);
        fill(tinte);
        rect(x,i+10,tamano,grueso)
        i=i+(espacio-1)    
      }
      for(i=x;i<x+tamano;i++){
        fill(color(0,0,0,0));
        rect(i,y,espacio,tamano);
        fill(tinte);
        rect(i+10,y,grueso,tamano)
        i=i+(espacio-1)    
      }
      pop();
    }
{{</details>}}

{{< p5-iframe sketch="/showcase/sketches/yellow-inducing.js" width="420" height="225" >}}

La ilusión yellow-inducing es una ilusión de color por asimilación y contraste.

Cuando un área está rodeada por un borde de color y ambos están parcialmente ocluidos por una rejilla de color, el área parece estar teñida en la misma dirección que el color de la rejilla (asimilación), así como en la dirección opuesta al color de la rejilla. envolvente (contraste). Se puede dar por uno de los siguientes efectos: _Munker illusion_, _chromatic dungeon illusion_, _dotted colour illusion_ ó _De Valois-De Valois illusion_.

## Conclusions and future work

A partir de los dos ejemplos anteriores se pueden obtener las siguientes conclusiones:

- Cuando se hablan de ilusiones ópticas existen mucha variedad de ellas que se aprovechan de cierta mecánica del cerebro para capturar la realidad de cierta manera.
- El ser humano evolucionó ciertos aspectos de su mente y sus sentidos para sobrevivir en los tiempos primitivos, estas evoluciones pueden ser aprovechadas para generar estas ilusiones en programas y animaciones visuales básicas que generan cierto ambiente que engaña a la mente de la realidad. 
- A partir de las investigaciones que se han relizado a lo largo de los años acerca de cómo funciona la visión del ser humano, se pueden entornos donde estos estudios se demuestran de manera experimental y pueden ser reproducidos, en su mayoría, por cualquier persona.

Como trabajo futuro se puede esperar desarrollar muchas más ilusiones ópticas y fenómenos visuales que requieran un desarrollo un poco más elaborado, donde además se puedan manejar otras variables con la esperanza de estudiar más a profundidad qué otros elementos pueden ser causantes de que estos fenómenos sean visibles.

{{< expand "Referencias" "...">}}

## Referencias

- https://www.researchgate.net/figure/Yellow-induction-In-each-image-the-left-circle-is-physically-the-same-white-as-the_fig5_228490244
- https://aic-color.org/resources/Documents/jaic_v5_review.pdf
- https://michaelbach.de/ot/mot-feetLin/
- https://en.wikipedia.org/wiki/Optical_illusion
  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}