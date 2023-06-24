---
weight: 2
---

# Mach bands

## Intro and background

Para el desarrollo de esta generación de terreno se hizo necesario el uso de perlin noise, el cual es un algoritmo de generación de ruido que se utiliza para generar patrones de ruido suave y orgánico que parecen naturales y aleatorios, pero que en realidad están controlados por una función matemática. Este ruido esta función matemática utiliza interpolación entre un gran número de gradientes precalculados de vectores que construyen un valor que varía seudo-aleatoriamente en el espacio o tiempo.

La idea detrás del Perlin noise es crear un patrón de valores de ruido que varíen suavemente a través de una matriz de puntos, lo que produce un efecto de movimiento y textura natural. </br>
Es frecuentemente utilizado en imágenes generadas por computadora para simular variabilidad en todo tipo de fenómenos, acercándose estas así a un aspecto más natural, sobre todo en efectos de computadora como el fuego, humo, nubes y en general todo tipo de fenómenos que requieran aleatoriedad sin perder continuidad.

<p align="center">
    <img src= "https://upload.wikimedia.org/wikipedia/commons/8/8b/PerlinNoise2d.png">
</p>

## Code and results

A la hora de utilizar este ruido para la generación de terreno se hizo necesario el uso de la función perlin() de la librería p5.js, la cual recibe unas ciertas coordenas y retorna el valor de perlin de estas.

### Generación de terreno con Perlin Noise

{{<details RelevantCode open>}}
        function setup() {
            createCanvas(600, 600, WEBGL);
            terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
        }

        function draw() {
            flying -= flyingSlider.value();
            let yoff = flying;
            for (let y = 0; y < rows; y++) {
                let xoff = 0;
                for (let x = 0; x < cols; x++) {
                    terrain[x][y] = map(noise(xoff, yoff), 0, 1, -maxSlider.value(), maxSlider.value());
                    xoff += 0.1;
                }
                yoff += 0.1;
            }
            background(56,124,149);
            for (let y = 0; y < rows - 1; y++) {
                beginShape(TRIANGLE_STRIP);
                for (let x = 0; x < cols; x++) {
                    vertex(x * sclSlider.value(), y * sclSlider.value(), terrain[x][y]);
                    vertex(x * sclSlider.value(), (y + 1) * sclSlider.value(), terrain[x][y + 1]);
                }
                endShape();
            }
        }
{{</details>}}

Para la creación de este programa se hizo uso de formas triangulares a los que se se les asignó como coordenas unos valores en X y Y fijos dentro de la grilla y en Z el valor obtenido con el perlin noise para cada coordenada. En este caso se permite generar un terreno que parece realista y no se ven cambios bruscos que tendría en caso de ser completamente aleatorio.

Por otro lado se generó una ilusión de movimiento al mover estar figuras en el eje X conservando sus coordenadas en Y y Z para que sea consistente con lo que se espera.

Por último, se tiene que para darle color se escogió una paleta de colores verdes que representan las montañas y que se encuentran en un rango que se mapea dentro de la generación de terreno dependiendo de la altura a la que se encuentra cada figura.

Dentro de este programa es posible modificar la velocidad de movimiento, la altura máxima de las montañas y la escala de tamaño de las figuras. Además de poder mostrar o no las figuras con la que se genera el terreno.

{{<details Code>}}
        let cols, rows;
        let h = 2000;
        let w = 1700;
        let flying = 0;
        let maxSlider;
        let flyingSlider;
        let sclSlider;
        let strokeCheckbox;
        function setup() {
            maxSlider = createSlider(50, 250, 150);
            maxSlider.position(10, 10);
            maxSlider.style("width", "80px");
            flyingSlider = createSlider(0, 0.5, 0.1, 0.05);
            flyingSlider.position(10, 30);
            flyingSlider.style("width", "80px");
            sclSlider = createSlider(20, 50, 20);
            sclSlider.position(120, 10);
            sclSlider.style("width", "80px");
            strokeCheckbox = createCheckbox("Stroke", false);
            strokeCheckbox.position(120, 30);
            strokeCheckbox.changed(getStroke);
            createCanvas(600, 600, WEBGL);
            noStroke();
            cols = w / sclSlider.value();
            rows = h / sclSlider.value();
            terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
        }
        function draw() {
            flying -= flyingSlider.value();
            let yoff = flying;
            for (let y = 0; y < rows; y++) {
                let xoff = 0;
                for (let x = 0; x < cols; x++) {
                    terrain[x][y] = map(noise(xoff, yoff), 0, 1, -maxSlider.value(), maxSlider.value());
                    xoff += 0.1;
                }
                yoff += 0.1;
            }
            background(56,124,149);
            rotateX(PI / 3);
            translate(-w / 2, -h / 2);
            for (let y = 0; y < rows - 1; y++) {
                beginShape(TRIANGLE_STRIP);
                for (let x = 0; x < cols; x++) {
                    fill(map(terrain[x][y], -maxSlider.value(), maxSlider.value(), 20, 55), map(terrain[x][y], -maxSlider.value(), maxSlider.value(), 65, 190), map(terrain[x][y], -maxSlider.value(), maxSlider.value(), 20, 60));
                    vertex(x * sclSlider.value(), y * sclSlider.value(), terrain[x][y]);
                    vertex(x * sclSlider.value(), (y + 1) * sclSlider.value(), terrain[x][y + 1]);
                }
                endShape();
            }
        }
        function getStroke() {
            if (strokeCheckbox.checked()){
                stroke(0);
            }
            else {
                noStroke();
            }
        }
{{</details>}}

{{< p5-iframe sketch="/VisualComp/sketches/terrainGenerator.js" width="625" height="625">}}

La ilusión de realismo dentro de este terreno se debe principalmente al perlin noise, sin embargo también es importante destacar que la ubicación de la cámara y el tamaño de la grilla son temas que no se deben dejar de lado a la hora de hacer esta generación, debido a que puede quedarse muy corto o dar la percepción de que las montañas se generan de la nada. 

## Conclusions and future work

Se puede concluir de este trabajo que 

- El perlin noise se utiliza comúnmente en la computación gráfica y el diseño de videojuegos para crear efectos visuales realistas, como terrenos montañosos, nubes, agua y texturas orgánicas.

- A la hora de darle color a una generación de terreno como esta, es necesario aplicar métodos para suavizar los cambios de color entre figuras, ya que sin este cambio se nota el cambio de colorentre figura y figura muy claramente.

- En caso de querer aumentar a su máximo nivel algunas variables como la velocidad o la altura máxima que puede tener el terreno, la generación puede dejar de verse fluida debido a la cantidad de elementos que debe calcular y la rapidez a la que lo debe hacer. 

Como trabajo futuro se espera poder mejorar el coloreado del terreno, de manera que se vea mucho más suave y natural; además de agregarle más opciones de visualización como lo puede ser cambiar la orientación de la cámara y que el avance del terreno sea acorde a este movimiento o que se pueda bajar o subir la vista sobre el mismo.

{{< expand "Referencias" "...">}}

## Referencias

- https://en.wikipedia.org/wiki/Perlin_noise
- https://www.youtube.com/watch?v=IKB1hWWedMk

  {{< /expand >}}

{{< button relref="/" >}}Get Home{{< /button >}}