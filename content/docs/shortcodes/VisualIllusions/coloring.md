---
weight: 1
---

# Coloring

## Intro and Background

El color es una percepción visual generada en el cerebro, producto de interpretar las señales nerviosas enviadas por los fotorreceptores en el ojo. Los cuerpos iluminados absorben una parte de las ondas electromagneticas y reflejan el resto, que son captadas por el ojo e interpretadas como los diferentes colores dentro de la parte visible del espectro electromagnetico.

### **Modelos de color** 

En computacion grafica es util entonces representar un conjunto determinado de colores, dicha tarea es posible mediante ciertos modelos matematicos, llamados modelos de color. Existen muchos modelos de color que permiten generar un color u otro segun diferentes parametros, algunos de estos modelos son RGB, CMY, HSL, etc. 

RGB por ejemplo, es un modelo aditivo donde se empieza con negro (ausencia de luz) y al sumar distintas cantidades de rojo, verde y azul se producen diferentes colores, por esta razon los modelos aditivos son utilzados en pantallas, donde el "lienzo" es negro. Por el contrario, CMY es un modelo sustractivo, donde se empieza con blanco (luz) y se mezclan cantidades de cian, magenta y amarillo para absorber diferentes longitudes de onda y asi producir el color deseado, esto hace a los modelos sustractivos utiles en la impresion a color.

<img src= "/resources/_gen/images/rgb-colores.png" >

Al analizar estos dos modelos de color es facil descubrir que la mezcla de unos pocos colores nos permiten crear una gama mucho mas amplia, a estos colores primitivos se les conoce como colores primarios, en modelos aditivos son el rojo, el varde y el azul (RGB) y en sustractivos el cian, el magenta y el amarillo (CMY). Sin embargo los colores primarios no son una propiedad fundamental de la luz, sino un concepto biologico que se basa en la respuesta del ojo humano a dicho fenomeno.

### **Modelo HSL** (Hue, Saturation, Lightness)

El modelo HSL es una transformacion no lineal del RGB, por tanto tambien es un modelo aditivo, sin embargo la gran diferencia esta en los parametros usados para representar el color. HSL esta basado en las propiedades del color: Matiz, Saturacion y Brillo, lo cual lo hace mas intuitivo a la hora de elegir los parametros que producen cierto color. 

### Parametros

{{< tabs "uniqueid" >}}

<!--1-->{{< tab "HSL" >}}

### HSL
* H: Matiz - Posicion de un color dentro de un circulo cromatico.
* S: Saturacion - Distancia a la escala de grises, mayor saturacion = color mas vivo.
* L: Luminosidad - Claridad u oscuridad del color, 0 equivale a negro.


<!--1-->{{< /tab >}}

<!--1-->{{< tab "RGB" >}}

### RGB
* R: Intensidad de Rojo.
* G: Intensidad de Verde.
* B: Intensidad de Azul.
        
<!--1-->{{< /tab >}}

{{< /tabs >}}





















## Code and results

### Color models

{{< p5-iframe sketch="/showcase/sketches/colorPicker.js" width="625" height="425">}}

## Conclusions and future work