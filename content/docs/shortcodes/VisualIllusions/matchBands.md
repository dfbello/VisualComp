---
weight: 2
---

# Match bands

## Intro and background

Para el desarrollo de esta generación de terreno se hizo necesario el uso de perlin noise, el cual es un algoritmo de generación de ruido que se utiliza para generar patrones de ruido suave y orgánico que parecen naturales y aleatorios, pero que en realidad están controlados por una función matemática. La idea detrás del Perlin noise es crear un patrón de valores de ruido que varíen suavemente a través de una matriz de puntos, lo que produce un efecto de movimiento y textura natural. 

Fue utilizado el algoritmo que viene incluido dentro de p5, el cual recibe coordenadas y devuelve un valor con perlin noise entre 0 y 1.

## Code and results

### Generación de terreno con Perlin Noise

Para la creación de este programa se hizo uso de formas triangulares a los que se se les asignó como coordenas unos valores en X y Y fijos dentro de la grilla y en Z el valor obtenido con el perlin noise para cada coordenada. En este caso se permite generar un terreno que parece realista y no se ven cambios bruscos que tendría en caso de ser completamente aleatorio.

Por otro lado se generó una ilusión de movimiento al mover estar figuras en el eje X conservando sus coordenadas en Y y Z para que sea consistente con lo que se espera.

Por último, se tiene que para darle color se escogió una paleta de colores verdes que representan las montañas y que se encuentran en un rango que se mapea dentro de la generación de terreno dependiendo de la altura a la que se encuantra cada figura.

{{< p5-iframe sketch="/showcase/sketches/terrainGenerator.js" width="625" height="625">}}

La ilusión de realismo dentro de este terreno se debe principalmente al perlin noise, sin embargo también es importante destacar que la ubicación de la cámara y el tamaño de la grilla son temas que no se deben dejar de lado a la hora de hacer esta generación, debido a que puede quedarse muy corto o dar la percepción de que las montañas se generan de la nada. 

## Conclusions and future work

Se puede concluir de este trabajo que 

- El perlin noise se utiliza comúnmente en la computación gráfica y el diseño de videojuegos para crear efectos visuales realistas, como terrenos montañosos, nubes, agua y texturas orgánicas.

- A la hora de darle color a una generación de terreno como esta, es necesario aplicar métodos para suavizar los cambios, ya que por sí solos no se puede tomar una sensación de realismo en los colores.

Como trabajo futuro se espera poder mejorar el coloreado del terreno, de manera que se vea mucho más suave y natural; además de agregarle más opciones de visualización como lo puede ser cambiar la orientación de la cámara y que el avance del terreno sea acorde a este movimiento o que se pueda bajar o subir la vista sobre el mismo.