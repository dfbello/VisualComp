---
bookCollapseSection: true
weight: 2
---

# Optical ilusions

## Intro and Background

Una ilusión óptica es una ilusión del sentido de la visión en la cual se puede percibir la realidad de varias formas, de manera que se engaña el sistema visual, desde el ojo al cerebro, y permite que se perciba la realidad de una forma distorsionada. Estas ilusiones pueden tomar muchas formas y pueden ser causadas por diferentes factores, como la forma en que el cerebro procesa la información visual, la iluminación, el contraste y la perspectiva. 

Esto ocurre debido a que el cerebro crea una percepción del mundo, por lo que en muchas ocasiones rellena ciertos huecos cuando la información que ve está incompleta o crea imágenes que no se encuentran allí. Esto debido a la evolución que ha tenido el sentido de la vista humano para sobrevivir, ya que el cerebro toma todas las piezas que pueda obtener a su a su alrededor y hace lo posible para deducir el resto.

## Code and results

A partir de esto, se han realizado diferentes ilusiones ópticas que se basan en engañar al ojo humano dandole información extra a la que es realmente necesaria.

### Ilusión de movimiento por pasos

Dentro del siguiente ejercicio se visualiza un movimiento de unos rectángulos que aparentan moverse paso a paso, sin embargo esto no es verdad, ya que estos se mueven constantemente. Esto se puede comprobar al dat clic izquierdo en el canva, donde se quitarán las líneas y se verá que efectivamente estos rectángulos se mueven constantemente.

{{< p5-iframe sketch="/showcase/sketches/stepVisualIllusions.js" width="625" height="325" >}}

Este efecto es causado principalmente por el efecto de contraste, el cual se refiere a las diferencias de luminancia tanto del fondo como de los objetos móviles, de manera que esta diferencia hace que el ojo perciba que cada objeto se mantiene en el contraste que mejor le queda del fondo, haciendo parecer que se mueva por pasos. Esto también permite ver la amplitud del movimiento y depende de los códigos visuales para el movimiento que tiene el cerebro.

Por esto mismo en este caso es necesario que los elementos móviles tengan contrastes diferentes entre sí, ya que entre mayor sea su diferencia de luminancia, más fácil será ver el efecto. Es por ello que en algunos caso se puede ver este ejemplo con móviles de color amarillo y azul, ya que existe un alto contraste entre ellos pero se dificulta un poco más de ver que con el blanco y el negro.

### Ilusión yellow-inducing

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
  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}