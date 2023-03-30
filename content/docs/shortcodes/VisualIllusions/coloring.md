---
weight: 1
---

# Coloring

## Intro and Background

El color es una percepción visual generada en el cerebro, producto de interpretar las señales nerviosas enviadas por los fotorreceptores en el ojo. Los cuerpos iluminados absorben una parte de las ondas electromagnéticas y reflejan el resto, que son captadas por el ojo e interpretadas como los diferentes colores dentro de la parte visible del espectro electromagnético.

### **Modelos de color** 

En computación gráfica es útil entonces representar un conjunto determinado de colores, dicha tarea es posible mediante ciertos modelos matemáticos, llamados modelos de color. Existen muchos modelos de color que permiten generar un color u otro según diferentes parámetros, entre ellos RGB, CMY, HSL, etc. 

RGB por ejemplo, es un modelo aditivo donde se empieza con negro (ausencia de luz) y al sumar distintas cantidades de rojo, verde y azul se produce toda la gama de colores, por esta razón los modelos aditivos como RGB son utilizados en pantallas, donde el "lienzo" es negro. Por el contrario, CMY es un modelo sustractivo, donde se empieza con blanco (luz) y se mezclan cantidades de cian, magenta y amarillo para absorber diferentes longitudes de onda y así producir el color deseado, esto hace a los modelos sustractivos útiles en la impresión a color.



<p align="center">
    <img src= "https://imborrable.com/wp-content/uploads/2022/10/rgb-colores.png" width=500>
</p>

Al analizar estos dos modelos de color es fácil descubrir que la mezcla de solo unos pocos colores nos permiten crear una gama mucho más amplia, a estos colores primitivos se les conoce como colores primarios, en modelos aditivos son el rojo, el verde y el azul (RGB) y en sustractivos el cian, el magenta y el amarillo (CMY). Los colores primarios no son una propiedad fundamental de la luz, sino un concepto biológico que se basa en la respuesta del ojo humano a dicho fenómeno.

### **Modelo HSL** (Hue, Saturation, Lightness)

El modelo HSL es una transformación no lineal del RGB, por tanto, también es un modelo aditivo, sin embargo, la gran diferencia está en los parámetros usados para representar el color. HSL está basado en las propiedades del color: Matiz, Saturación y Brillo, lo cual lo hace más intuitivo que RGB a la hora de elegir los parámetros que producen cierto color. 

<p align="center">
    <img src="https://static.javatpoint.com/tutorial/dip/images/introduction-to-color-spaces5.png">
</p>

### Parametros

{{< tabs "uniqueid" >}}

<!--1-->{{< tab "HSL" >}}

### HSL
* H: Matiz - Posición de un color dentro de un círculo cromático.
* S: Saturación - Distancia a la escala de grises, mayor saturación = color más vivo.
* L: Luminosidad - Claridad u oscuridad del color, 0 equivale a negro.


<!--1-->{{< /tab >}}

<!--1-->{{< tab "RGB" >}}

### RGB
* R: Intensidad de Rojo.
* G: Intensidad de Verde.
* B: Intensidad de Azul.
        
<!--1-->{{< /tab >}}

{{< /tabs >}}

El siguiente ejercicio le presenta un color seleccionado aleatoriamente, intente recrearlo con la mayor similitud posible usando RGB y HSL, note la facilidad de HSL para aclarar, oscurecer y saturar el mismo color(matiz).


## Code and results

{{< p5-iframe sketch="/showcase/sketches/colorPicker.js" width="625" height="425">}}

{{< details Codigo>}}
    let colorRange = [20,230]
    let Rslider, Gslider, Bslider;
    let Hslider, Sslider, Lslider;

    function setup() {
        createCanvas(windowWidth - 19, windowHeight - 20);
        
        background(random(colorRange[0],colorRange[1]), random(colorRange[0],colorRange[1]),random(colorRange[0],colorRange[1]));
        
        Rslider = createSlider(0,255, 125,0);
        Gslider = createSlider(0,255, 125,0);
        Bslider = createSlider(0,255, 125,0);
        
        Hslider = createSlider(0,360,360,0);
        Sslider = createSlider(0,100,0,0);
        Lslider = createSlider(0,100,50,0);
    }

    function draw() {
        let R = Rslider.value();
        Rslider.position(15, height * 2/3 + 10);
        let G = Gslider.value();
        Gslider.position(15, height * 2/3 + 30);
        let B = Bslider.value();
        Bslider.position(15, height * 2/3 + 50);
        
        let H = Hslider.value();
        Hslider.position(width * (1-2/6), height * 2/3 + 10);
        let S = Sslider.value();
        Sslider.position(width * (1-2/6), height * 2/3 + 30);
        let L = Lslider.value();
        Lslider.position(width * (1-2/6), height * 2/3 + 50);
        
        push(); //left rectangle RGB
        noStroke();
        fill(R,G,B);
        rect(0, 0, width /3, height * 2/3);
        pop();
        
        push(); //right rectangle HSL
        noStroke();
        colorMode(HSL);
        fill(H,S,L);
        rect(width, 0, -width/3, height * 2/3)
        pop();
        
        push();
        rectMode(CORNERS);
        textFont("Arial");
        textSize(35);
        textAlign(CENTER,CENTER);
        text("RGB", 0, 0, width /3, height * 2/3);
        text("HSL", width, 0, -width/3, height * 2/3);
        pop();
    
    }
{{</details>}}

## Conclusions and future work

Se puede concluir lo siguiente:
* Los modelos de color sirven para representar un conjunto determinado de colores.
* El modelo de color que se utiliza en diferentes aplicaciones tecnológicas depende del uso mismo, cada modelo tiene ventajas y desventajas.
* HSL y modelos similares, son más intuitivos para la recreación de un color en particular, comparados con RGB.

Como futuros avances se puede extender el ejercicio a otros modelos de color, o la implementacion de un color picker, utilizando alguno de estos modelos.

{{< expand "Referencias" "...">}}

## Referencias

- 
  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}
