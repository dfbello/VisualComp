---
weight: 4
---

# Depth perception

## Intro and background

La percepción de la profundidad es la capacidad de percibir la distancia y la forma tridimensional de los objetos del entorno. Es un aspecto esencial de la visión humana que nos permite navegar e interactuar con el mundo que nos rodea.

Las señales monoculares (monocular cues) son señales visuales que proporcionan información sobre la profundidad y la distancia. Algunas de las categorías de este efecto se pueden definir como las siguientes:

Gradiente de textura: Esta señal se basa en el hecho de que el tamaño y el espaciado de los elementos de textura en una escena visual parecen hacerse más pequeños y estar más juntos a medida que se alejan en la distancia.

Tamaño relativo: Esta señal se basa en el hecho de que los objetos más lejanos parecen más pequeños que los más cercanos.

Perspectiva lineal: Se basa en el hecho de que las líneas paralelas parecen converger a medida que se mueve a la distacia. Por ejemplo, los lados de una carretera o las vías del tren parecen converger a medida que se alejan

Interposición: Esta señal se produce cuando un objeto obstruye parcialmente a otro, indicando que el objeto obstruido está más lejos.

## Code and results

### Dots depth perception pattern

Dentro del siguiente código se tiene un patrón de percepción de profundidad con unos puntos que aprentan estar en en diferentes distancias, haciendo parecer que la escena se encuentra en tercera dimensión, sin embargo esta solo está generada con círculos en dos dimensiones y está acompañada de un movimiento dado por el luegar en el que se encuentre el mouse. En este caso los puntos se moverán hacia la posición en la que esté el mouse y entre más alejado esté del centro será más rápido.

{{< p5-iframe sketch="/showcase/sketches/dotsPerspective.js" width="725" height="525">}}

Este efecto se logra al crear tres niveles en los que se dibujan los puntos, en donde cada uno tiene un tamaño definido que depende de lo lejano que se quiera hacer ver. Luego de ello se hace un cálculo de la nueva posición que debe tener cada uno y la dirección dependiendo del lugar donde se encuentre el mouse y lo alejado que esté del centro.; teniendo en cuenta que cada capa debe tener una velocidad diferente de movimiento. Además de ello se dibuja primero todos los puntos que estén más atrás, luego los del medio y luego los de más adelante para que no exista una superposición que afecte la vizualización del fenómeno.
En este caso se aprovecha el tamaño relativo para crear la ilusión de perspectiva

### Silla de Beuchet

La ilusión óptica creada por la Silla de Beuchet es una ilusión óptica que juega con nuestra percepción visual, gracias a que nuestro cerebro piensa que las cosas que se alinean perfectamente en el mundo realmente son de esta manera. Pero esta ilusión funciona separando las patas y el asiento, por una gran distancia por lo cual, el asiento de la silla se encuentra a una distancia mucho más grande que las patas, por este mismo motivo debe ser más grande, para mantener las dimensiones. Luego debemos pararnos en el sitio correcto para que la silla parezca una pieza completa.

Como esto de tener un espaldar muy grande y unas patas más pequeñas o normales no es nada intuitivo el cerebro une las partes y crea nuestra Silla de Beuchet.

Aquí se puede observar una imagen mostrando la ilusión óptica, pareciera que las personas tienen una diferencia de tamaño muy grande, pero lo cierto es que no es así.

A continuación, se implementa un canvas mostrando la ilusión en el cual se puede observar la silla de manera normal, pero si se desliza el mouse de manera horizontal, se logra percibir que son dos piezas separadas y una de mayor tamaño que la otra:

{{< p5-iframe sketch="/showcase/sketches/beuchet.js" width="525" height="525">}}

En este caso se utiliza el gradiente de textura para dar la ilusión de la silla formada

## Conclusions and future work

A partir de lo realizado anteriormente, se puede concluir que

- La percepción de la profundidad en el ser humano está dado por diferentes características que utliza el cerebro para determinar la ubicación o la forma de ciertos objetos a partir de lo que percibe con el fin de determinar lo que lo rodea en su entorno tridimensional

- Las monocular cues son muy útiles para dar percepción de profundidad en el caso en el que se tenga que realizar esta tarea en un ambiente bidimensional, aprovechandose de diferentes técnicas definidas en categorías que se usan dependiendo de la finalidad deseada.

Como trabajo futuro, se esperan realizar más ejemplos de esta percepción a partir de las otras categorías que proveen las monocular cues, de esta manera aprender a dar ilusiones de tridimensionalidad con elementos bidimensionales.

{{< expand "Referencias" "...">}}

## Referencias

- https://en.wikipedia.org/wiki/Depth_perception
- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5131737/
- https://homepage.divms.uiowa.edu/~stroyan/Site/Vision.html

  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}
