---
weight: 4
---

# Depth perception

## Intro and background

## Code and results

### Dots depth perception pattern

Dentro del siguiente código se tiene un patrón de percepción de profundidad con unos puntos que aprentan estar en en diferentes distancias, haciendo parecer que la escena se encuentra en tercera dimensión, sin embargo esta solo está generada con círculos en dos dimensiones y está acompañada de un movimiento dado por el luegar en el que se encuentre el mouse. En este caso los puntos se moverán hacia la posición en la que esté el mouse y entre más alejado esté del centro será más rápido.

{{< p5-iframe sketch="/showcase/sketches/dotsPerspective.js" width="725" height="525">}}

Este efecto se logra al crear tres niveles en los que se dibujan los puntos, en donde cada uno tiene un tamaño definido que depende de lo lejano que se quiera hacer ver. Luego de ello se hace un cálculo de la nueva posición que debe tener cada uno y la dirección dependiendo del lugar donde se encuentre el mouse y lo alejado que esté del centro.; teniendo en cuenta que cada capa debe tener una velocidad diferente de movimiento. Además de ello se dibuja primero todos los puntos que estén más atrás, luego los del medio y luego los de más adelante para que no exista una superposición que afecte la vizualización del fenómeno. 

## Conclusions and future work