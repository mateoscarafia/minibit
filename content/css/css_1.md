# Guía Completa de CSS3 con Ejemplos Prácticos

## Selectores y Combinadores

### Selectores Básicos

```css
/* Selector de elemento */
p {
  color: blue;
}

/* Selector de clase */
.destacado {
  font-weight: bold;
}

/* Selector de ID */
#principal {
  background-color: #f0f0f0;
}
```

### Pseudo-clases y Pseudo-elementos

```css
/* Pseudo-clases */
a:link { color: blue; }        /* Enlace no visitado */
a:visited { color: purple; }   /* Enlace visitado */
a:hover { text-decoration: underline; } /* Ratón sobre el elemento */
input:focus { border-color: green; } /* Elemento con foco */

/* Pseudo-elementos */
p::first-line { font-weight: bold; } /* Primera línea de texto */
p::first-letter { font-size: 2em; }  /* Primera letra */
```

### Selectores de Atributos

```css
/* Elementos con atributo específico */
[title] {
  cursor: help;
}

/* Elementos con valor exacto */
[type="submit"] {
  background-color: green;
}

/* Elementos que contienen valor */
[class*="btn-"] {
  padding: 5px 10px;
}

/* Elementos que comienzan con valor */
[href^="https"] {
  color: darkgreen;
}

/* Elementos que terminan con valor */
[src$=".png"] {
  border: 1px solid #ccc;
}
```

## Modelo de Caja

```css
.box {
  width: 300px;
  height: 200px;
  padding: 20px; /* Espacio interior */
  border: 5px solid #333;
  margin: 30px; /* Espacio exterior */
  box-sizing: border-box; /* Incluye padding y border en el ancho/alto */
}
```

## Colores y Fondos

### Formatos de Color

```css
.colores {
  color: red; /* Nombre */
  color: #ff0000; /* Hexadecimal */
  color: rgb(255, 0, 0); /* RGB */
  color: rgba(255, 0, 0, 0.5); /* RGB con transparencia */
  color: hsl(0, 100%, 50%); /* HSL (Matiz, Saturación, Luminosidad) */
  color: hsla(0, 100%, 50%, 0.5); /* HSL con transparencia */
}
```

### Fondos y Degradados

```css
.fondo {
  background-color: #f5f5f5;
  background-image: url('imagen.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  
  /* Degradado lineal */
  background: linear-gradient(to right, red, yellow);
  
  /* Degradado radial */
  background: radial-gradient(circle, red, yellow, green);
}
```

## Tipografía y Texto

```css
.texto {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  text-align: justify;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}
```

## Flexbox

```css
.contenedor-flex {
  display: flex;
  flex-direction: row; /* o column, row-reverse, column-reverse */
  justify-content: center; /* Alineación en eje principal */
  align-items: center; /* Alineación en eje secundario */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan */
  gap: 10px; /* Espacio entre elementos */
}

.item-flex {
  flex: 1; /* Crecimiento proporcional */
  min-width: 100px;
  order: 2; /* Cambia el orden visual */
  align-self: flex-start; /* Alineación individual */
}
```

## Grid

```css
.contenedor-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 columnas con proporciones */
  grid-template-rows: 100px auto 50px;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  gap: 15px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

## Transiciones y Animaciones

### Transiciones

```css
.boton {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s;
}

.boton:hover {
  background-color: darkblue;
  transform: scale(1.05);
}
```

### Animaciones

```css
@keyframes rebote {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.elemento-animado {
  animation: rebote 2s infinite;
}
```

## Transformaciones

```css
.transformado {
  transform: rotate(15deg) scale(1.1) translateX(10px);
  transform-origin: center center;
  
  /* 3D */
  transform: perspective(500px) rotateY(45deg);
  backface-visibility: hidden;
}
```

## Media Queries (Diseño Responsivo)

```css
/* Estilos base */
.contenedor {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .contenedor {
    width: 750px;
    margin: 0 auto;
  }
}

/* Escritorio */
@media (min-width: 992px) {
  .contenedor {
    width: 970px;
  }
}

/* Pantallas grandes */
@media (min-width: 1200px) {
  .contenedor {
    width: 1170px;
  }
}
```

## Filtros y Efectos Visuales

```css
.imagen-filtrada {
  filter: grayscale(50%) blur(2px) brightness(120%);
  mix-blend-mode: multiply;
}

.sombra {
  box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
```

## Variables CSS

```css
:root {
  --color-primario: #3498db;
  --espaciado: 15px;
  --fuente-titulo: 'Roboto', sans-serif;
}

.elemento {
  color: var(--color-primario);
  padding: var(--espaciado);
  font-family: var(--fuente-titulo);
}
```

## Scroll Snap

```css
.galeria {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
}

.slide {
  scroll-snap-align: start;
  min-width: 100vw;
}
```

## Multicolumnas

```css
.texto-columnas {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ddd;
}
```

## Interfaz de Usuario

```css
.elemento-ui {
  resize: both; /* Permite redimensionar */
  cursor: pointer; /* Cambia el cursor */
  outline: none; /* Quita el contorno al enfocar */
  user-select: none; /* Evita selección de texto */
}
```

## Ejemplo Completo: Tarjeta Responsiva

```html
<div class="tarjeta">
  <div class="tarjeta-imagen"></div>
  <div class="tarjeta-contenido">
    <h3>Título de la Tarjeta</h3>
    <p>Descripción o contenido de la tarjeta.</p>
    <button class="boton">Ver más</button>
  </div>
</div>
```

```css
:root {
  --color-primario: #3498db;
  --sombra: 0 4px 6px rgba(0,0,0,0.1);
}

.tarjeta {
  width: 100%;
  max-width: 350px;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--sombra);
  transition: transform 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;
}

.tarjeta:hover {
  transform: translateY(-5px);
}

.tarjeta-imagen {
  height: 200px;
  background: linear-gradient(45deg, var(--color-primario), #2ecc71);
}

.tarjeta-contenido {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.boton {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: var(--color-primario);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.boton:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .tarjeta {
    max-width: 100%;
  }
}
```

## Consejos Finales

1. **Organización**: Usa metodologías como BEM para nombrar clases.
2. **Performance**: Minimiza el uso de selectores complejos y evita !important.
3. **Compatibilidad**: Verifica la compatibilidad con caniuse.com.
4. **Preprocesadores**: Considera usar SASS o LESS para CSS más mantenible.
5. **Variables**: Aprovecha las variables CSS para mantener consistencia.

Esta guía cubre los conceptos principales de CSS3 mostrados en el PDF, con ejemplos prácticos que puedes adaptar a tus proyectos. CSS3 es extremadamente versátil y estas técnicas te permitirán crear diseños modernos, responsivos y atractivos.
