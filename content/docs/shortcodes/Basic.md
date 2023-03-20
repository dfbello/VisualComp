---
weight: 1
---
# Basic

Dentro de está página se encuentran los elementos básicos de markdown con la que está construido este proyecto, con algunos ejemplos de cómo fueron utilizados

## Buttons

Botones con link interno y externo.

### Example

{{< button relref="/" >}}Get Home{{< /button >}}
{{< button href="https://github.com/alex-shpak/hugo-book" >}}Contribute{{< /button >}}

## Columns

Las columnas ayudan a organizar piezas de contenido más cortas horizontalmente para facilitar la lectura.

```html
{{</* columns */>}} <!-- begin columns block -->
# Left Content
Texto alineado a la izquierda

<---> <!-- magic separator, between columns -->

# Mid Content
Texto en el medio

<---> <!-- magic separator, between columns -->

# Right Content
Texto alineado a la derecha
{{</* /columns */>}}
```

### Example

{{< columns >}}

#### Left Content

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.

<--->

#### Mid Content

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter!

<--->

#### Right Content

Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
Miseratus fonte Ditis conubia.
{{< /columns >}}

{{< button relref="/" >}}Get Home{{< /button >}}