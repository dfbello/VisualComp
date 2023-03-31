---
weight: 3
---

# Masking

## Intro and background

Los patrones de Moiré son patrones de interferencia que aparecen cuando dos o más patrones de líneas se superponen y no están perfectamente alineados. Este efecto se produce cuando se colocan dos rejillas con patrones de líneas finas una encima de la otra, de tal manera que las líneas de una rejilla no están perfectamente alineadas con las líneas de la otra rejilla. Como resultado, se produce una interferencia entre los patrones de líneas, lo que crea un patrón de ondulación o un efecto de malla en la imagen resultante.

## Code and results

### Moire Patterns

En este caso se van a utilizar patrones con círculos para crear efectos ondulatorios al superponer dos series de círculos con el mismo espacio entre ellos, donde uno se mueve a lo largo del canvas mientras que el otro se mantiene estático. De esta manera se genera un patrón de moire.

#### Patrón de círculos

{{< p5-iframe sketch="/showcase/sketches/moirePattern1.js" width="425" height="425">}}

#### Patrón con elipses sobrepuestos

{{< p5-iframe sketch="/showcase/sketches/moirePattern2.js" width="525" height="575">}}

#### Patrón de líneas sobrepuestas

{{< p5-iframe sketch="/showcase/sketches/moirePattern3.js" width="425" height="425">}}

### Dithering

{{< p5-iframe sketch="/showcase/sketches/dithering.js" width="625" height="625">}}

### Image kernel

En este caso se tiene un procesador de imágenes que soporta diferentes kernels de imágenes con su respectivo histograma y su cambio de brillo.
En este caso se puede subir cualquier imagen que se desee modificar y se mostrará esta imagen original al lado de la imagen modificada con los kernels que se escojan, además que el histograma se muestra siempre con la imagen modificada.
Se debe tener en cuenta que este histograma representa la cantidad de pixeles que tienen un mismo valor tonal, es decir la oscuridad o brillo, dentro de la imagen; es por esto que se genera un total de 256 líneas.

Cada uno de los diferentes kernels se pude escoger con el desplegable que se encuentra a la izquierda, mientras que se necesitan presionar las teclas "+" o "-" para cambiar el brillo de la imagen en cuestión.

{{< p5-iframe sketch="/showcase/sketches/kernelImages.js" width="625" height="625">}}

## Conclusions and future work

Se puede concluir lo siguiente:

- El masking que superpone dos imagenes como lo vemos en el primer ejemplo, muestra la facilidad de crear este tipo de ilusiones y que se vean visualmente atractivas.

Como futuros avances se puede extender el ejercicio superponiendo unas ilusiones sobre otras, lo cual generarán algunas más interesantes.
