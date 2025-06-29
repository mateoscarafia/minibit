# +100 Conceptos de JavaScript

### 1. Variables:
Las variables son contenedores para almacenar valores de datos. Hay tres tipos de variables en JavaScript: `var`, `let` y `const`.

```javascript
let x = 5; // x es 5
const pi = 3.14; // pi es una constante 3.14
```

### 2. Tipos de Datos:
JavaScript tiene varios tipos de datos incluyendo Number, String, Boolean, Object, Function, Null y Undefined.

```javascript
let numero = 5; // Número
let texto = "Hola"; // String
```

### 3. Arreglos:
Los arreglos se utilizan para almacenar múltiples valores en una sola variable.

```javascript
let frutas = ["manzana", "banana", "cereza"];
```

### 4. Objetos:
Los objetos también son variables. Pero los objetos pueden contener muchos valores.

```javascript
let auto = {tipo:"Fiat", modelo:"500", color:"blanco"};
```

### 5. Operadores:
JavaScript incluye operadores aritméticos, de comparación, bitwise, lógicos, de asignación, etc.

```javascript
let x = 5;
let y = x + 2; // y es ahora 7
```

*Por: Waleed Mousa*

### 6. Estructuras de Control:
Las estructuras de control te ayudan a manejar el flujo de tu programa. Esto incluye `if`, `else`, `switch`, `for`, `while`, `do-while`.

```javascript
if (x > y) {
    // hacer algo
} else {
    // hacer otra cosa
}
```

### 7. Funciones:
Las funciones son bloques de código que pueden definirse y luego llamarse en un momento posterior o en respuesta a un evento.

```javascript
function miFuncion(x, y) {
    return x * y;
}
```

### 8. Eventos:
La interacción de JavaScript con HTML se maneja a través de eventos que ocurren cuando el usuario o el navegador manipulan una página.

```html
<button onclick="miFuncion()">Haz clic</button>
```

### 9. Strings y Métodos de String:
Los strings son útiles para contener datos que pueden representarse en forma de texto. Hay muchos métodos que se pueden usar con strings, incluyendo `length`, `indexOf`, `search`, `replace`, etc.

```javascript
let txt = "¡Hola Mundo!";
let x = txt.length;  // x es ahora 12
```

### 10. Números y Métodos de Números:
JavaScript tiene solo un tipo de número. Los números pueden escribirse con o sin decimales. Los números en JavaScript también pueden incluir `+` y `-`, y `e` para indicar exponentes.

```javascript
let x = 123e5;  // x es 12300000
let y = 123e-5;  // y es 0.00123
```

### 11. Fechas:
Los objetos Date de JavaScript representan un solo momento en el tiempo en un formato independiente de la plataforma. Los objetos Date contienen un número que representa los milisegundos pasados desde el Epoch de Unix.

```javascript
let d = new Date();
```

### 12. Math en JavaScript:
Math es un objeto incorporado que tiene propiedades y métodos para constantes y funciones matemáticas.

```javascript
console.log(Math.PI); // 3.141592653589793
console.log(Math.sqrt(16)); // 4
```

### 13. Lógica Booleana:
Boolean es un tipo de dato que devuelve uno de dos valores: `true` o `false`.

```javascript
let esCodigoDivertido = true;
let esPescadoSabroso = false;
```

### 14. Manejo de Errores (try/catch/finally):
JavaScript permite el manejo de excepciones mediante los bloques `try`, `catch` y `finally`. `try` contiene el código a ejecutar, `catch` captura cualquier error y `finally` ejecuta código independientemente de si ocurrió un error o no.

```javascript
try {
    noEsUnaFuncion();
} catch(err) {
    console.log(err); // ReferenceError: noEsUnaFuncion no está definida
} finally {
    console.log('Esto se ejecutará sin importar el resultado de try/catch');
}
```

### 15. Expresiones Regulares:
Una expresión regular es un objeto que describe un patrón de caracteres.

```javascript
let patt = new RegExp("e");
let res = patt.test("¡Las mejores cosas en la vida son gratis!");
```

### 16. JSON:
JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos que es fácil de leer y escribir para humanos, y fácil de analizar y generar para máquinas.

```javascript
let texto = '{"nombre":"Juan", "nacimiento":"1986-12-14", "ciudad":"Nueva York"}'; 
let obj = JSON.parse(texto);
```

### 17. AJAX:
AJAX se trata de actualizar partes de una página web sin recargar toda la página. Significa JavaScript y XML Asíncronos.

```javascript
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "nombre_archivo", true);
xhttp.send();
```

### 18. Promesas:
Una Promesa es un objeto que representa la eventual finalización o falla de una operación asíncrona.

```javascript
let promesa = new Promise(function(resolver, rechazar) {
    // hacer algo, posiblemente asíncrono, luego...
    if (/* todo salió bien */) {
        resolver("¡Funcionó!");
    } else {
        rechazar(Error("Falló"));
    }
});
```

### 19. Async/Await:
`async` y `await` hacen que las promesas sean más fáciles de escribir.

```javascript
async function ejemplo() {
    let respuesta = await fetch('https://api.github.com/users/github');
    let usuario = await respuesta.json();
    return usuario;
}
```

### 20. Cierres (Closures):
Un cierre es la combinación de una función agrupada junto con referencias a su estado circundante (el entorno léxico).

```javascript
function hacerSumador(x) {
    return function(y) {
        return x + y;
    };
}
let sumar5 = hacerSumador(5);
let sumar10 = hacerSumador(10);
console.log(sumar5(2)); // 7
console.log(sumar10(2)); // 12
```

### 21. Funciones Flecha:
Las funciones flecha permiten una sintaxis más corta al escribir funciones. Las funciones flecha no tienen su propio `this`.

```javascript
const cuadrado = x => x * x;
```

### 22. Literales de Plantilla:
Los literales de plantilla proporcionan una manera fácil de interpolar variables y expresiones en strings.

```javascript
let nombre = "Juan";
console.log(`Hola, ${nombre}!`); // "Hola, Juan!"
```

### 23. Operador de Propagación y Parámetros Rest:
El operador de propagación permite que un iterable se expanda en lugares donde se esperan cero o más argumentos. La sintaxis de parámetros rest permite que una función acepte un número indefinido de argumentos como un arreglo.

```javascript
// Operador de propagación
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]

// Parámetros rest
function sumar(...losArgs) {
    return losArgs.reduce((previo, actual) => {
        return previo + actual;
    });
}
```

### 24. Asignación por Desestructuración:
La sintaxis de asignación por desestructuración es una expresión de JavaScript que hace posible desempaquetar valores de arreglos o propiedades de objetos en variables distintas.

```javascript
let [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```

### 25. Módulos:
Los módulos de JavaScript son una forma de compartir y reutilizar código entre archivos.

```javascript
// lib/math.js
export function sumar(x, y) {
    return x + y;
}

// otro archivo
import { sumar } from './lib/math.js';
console.log(sumar(1, 2)); // 3
```

### 26. Clases y Herencia:
Las clases son una plantilla para crear objetos. La herencia es una forma de crear una nueva clase utilizando métodos y propiedades de una clase existente.

```javascript
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }
    hablar() {
        console.log(this.nombre + ' hace un ruido.');
    }
}

class Perro extends Animal {
    hablar() {
        console.log(this.nombre + ' ladra.');
    }
}
```

### 27. Símbolos:
Los símbolos son un nuevo tipo primitivo en JavaScript. Cada valor de símbolo devuelto por `Symbol()` es único.

```javascript
let sym1 = Symbol();
let sym2 = Symbol("clave"); // clave de string opcional
```

### 28. Iteradores y Generadores:
Los iteradores son objetos que saben cómo acceder a elementos de una colección uno a la vez, manteniendo un seguimiento de su posición actual dentro de esa secuencia. Los generadores son una clase especial de funciones que simplifican la tarea de escribir iteradores.

```javascript
function* generadorDeIds(){
    let id = 0;
    while(true) {
        yield id++;
    }
}

const numeros = [1, 2, 3, 4, 5];
const iterador = numeros[Symbol.iterator]();

console.log(iterador.next().value); // Salida: 1
console.log(iterador.next().value); // Salida: 2
```

### 29. Map, Filter y Reduce:
`map`, `filter` y `reduce` son todos métodos de arreglo en JavaScript que proporcionan un estilo de programación funcional.

```javascript
let numeros = [1, 2, 3, 4];
let dobles = numeros.map(item => item * 2);
let mayoresQueDos = numeros.filter(item => item > 2);
let suma = numeros.reduce((a, b) => a + b);
```

### 30. Set y Map:
Tanto Set como Map son objetos incorporados más recientes en JavaScript. Un objeto Set te permite almacenar valores únicos de cualquier tipo, ya sean valores primitivos o referencias de objetos. Un objeto Map contiene pares clave-valor y recuerda el orden original de inserción de las claves.

```javascript
let set = new Set();
set.add(1);
set.add('1'); // Diferente a 1 porque es un string.

let mapa = new Map();
mapa.set('nombre', 'Juan');
mapa.set('edad', 25);
```

### 31. NaN:
NaN es un valor especial que significa "No es un Número". Se utiliza para indicar un valor indefinido o no representable.

```javascript
console.log(Math.sqrt(-1)); // NaN
```

### 32. Null y Undefined:
Tanto `null` como `undefined` son valores especiales en JavaScript. `undefined` significa que una variable ha sido declarada pero aún no se le ha asignado un valor. `null` es un valor de asignación. Se puede asignar a una variable para representar ningún valor o ningún objeto.

```javascript
let prueba;
console.log(prueba); // undefined

prueba = null;
console.log(prueba); // null
```

### 33. Truthy y Falsy:
Cada valor en JavaScript tiene un valor booleano inherente. Cuando ese valor se evalúa en el contexto de una expresión booleana, decimos que el valor es truthy o falsy.

```javascript
console.log(Boolean('')); // false - String vacío es falsy.
console.log(Boolean('Hola')); // true - String no vacío es truthy.
```

### 34. Objeto Global:
En JavaScript, el objeto global es un objeto especial que contiene todas las funciones y variables accesibles globalmente.

```javascript
console.log(window.setTimeout); // function setTimeout() { [native code] }
console.log(Math.sqrt(4)); // 2
```

### 35. Coerción de Tipos:
La coerción de tipos es el proceso de convertir un valor de un tipo a otro (como de string a número, de objeto a booleano, etc.). Puede ser implícita o explícita.

```javascript
let x = "5";
console.log(x + 1); // "51"
console.log(+x + 1); // 6
```

### 36. Alcance y Hoisting:
El alcance es la accesibilidad o visibilidad de variables, funciones y objetos en alguna parte particular de tu código durante el tiempo de ejecución. Hoisting es un mecanismo de JavaScript donde las declaraciones de variables y funciones se mueven a la parte superior de su alcance contenedor.

```javascript
console.log(x); // undefined - Debido al hoisting
var x = 5;
```

### 37. Inmutabilidad:
En JavaScript, `const` no crea una variable inmutable, pero sí crea una variable que no puede reasignarse. Para arreglos y objetos, significa que no puedes reasignar el objeto completo, pero puedes mutar sus propiedades.

```javascript
const obj = { a: 1 };
obj.b = 2;
console.log(obj); // { a: 1, b: 2 }
```

### 38. Funciones de Callback:
Una función de callback es una función que se pasa a otra función como argumento, que luego se invoca dentro de la función externa.

```javascript
function saludo(nombre) {
    console.log('Hola ' + nombre);
}

function procesarEntradaUsuario(callback) {
    let nombre = prompt('Por favor ingresa tu nombre.');
    callback(nombre);
}

procesarEntradaUsuario(saludo);
```

### 39. Prototipo y Herencia:
Los prototipos son el mecanismo por el cual los objetos de JavaScript heredan características unos de otros.

```javascript
let animal = {
    come: true
};
let conejo = Object.create(animal);
console.log(conejo.come); // true
```

### 40. APIs Web:
Las APIs Web proporcionan la funcionalidad para crear una aplicación web dinámica e interactiva. Estas APIs incluyen manipulación del DOM, Fetch API, Geolocation API, Web Storage y más.

```javascript
fetch('https://api.github.com/users/github')
.then(respuesta => respuesta.json())
.then(datos => console.log(datos));
```

### 41. Palabra Clave `this`:
La palabra clave `this` se refiere al objeto que está ejecutando la función actual.

```javascript
const persona = {
    nombre: 'Juan',
    saludar: function() { console.log('Hola, ' + this.nombre); }
};
persona.saludar(); // 'Hola, Juan'
```

### 42. Timeouts e Intervalos:
La función `setTimeout` se utiliza para programar la ejecución de código después de una cantidad designada de milisegundos. `setInterval` se utiliza para ejecutar código repetidamente, comenzando después del intervalo de tiempo y luego repitiéndose continuamente en ese intervalo.

```javascript
setTimeout(() => {
    console.log('Se ejecuta después de 2 segundos');
}, 2000);

setInterval(() => {
    console.log('Se ejecuta cada segundo');
}, 1000);
```

### 43. Operadores Bitwise:
Los operadores bitwise tratan los operandos como una secuencia de 32 bits y te permiten manipular bits individuales en un operando.

```javascript
let x = 5;    // binario: 0101
let y = 1;    // binario: 0001
let resultado = x & y; // binario: 0001, decimal: 1
```

### 44. Almacenamiento Local (Local Storage):
Local Storage te permite acceder a un objeto Storage local. Los datos se almacenan persistentemente y no se envían con cada solicitud al servidor.

```javascript
localStorage.setItem('miClave', 'miValor');
let datos = localStorage.getItem('miClave');
console.log(datos); // 'miValor'
```

### 45. Almacenamiento de Sesión (Session Storage):
Session Storage te permite agregar, modificar o eliminar datos almacenados que se guardan temporalmente y se eliminan cuando termina la sesión (cuando se cierra la pestaña).

```javascript
sessionStorage.setItem('claveSesion', 'valorSesion');
let datos = sessionStorage.getItem('claveSesion');
console.log(datos); // 'valorSesion'
```

### 46. Atributos de Datos:
Los atributos de datos te permiten asignar datos personalizados a un elemento.

```html
<div id="miDiv" data-mi-atributo="hola"></div>

<script>
let div = document.getElementById('miDiv');
let datosPersonalizados = div.dataset.miAtributo;
console.log(datosPersonalizados); // 'hola'
</script>
```

### 47. Literales de Plantilla Etiquetados:
Los literales de plantilla etiquetados te permiten analizar literales de plantilla con una función.

```javascript
let a = 5;
let b = 10;

function etiqueta(strings, ...valores) {
    console.log(strings[0]); // "Hola "
    console.log(strings[1]); // " mundo "
    console.log(valores[0]); // 15
    console.log(valores[1]); // 50
}

etiqueta`Hola ${a + b} mundo ${a * b}`;
```

### 48. IIFE (Expresión de Función Invocada Inmediatamente):
Una IIFE es una función que se ejecuta tan pronto como se define.

```javascript
(function() {
    console.log("¡Esto es una IIFE!");
})();
```

### 49. Modo Estricto:
El modo estricto hace varios cambios a la semántica normal de JavaScript. Elimina algunos errores silenciosos de JavaScript al cambiarlos para que lancen errores.

```javascript
'use strict';
x = 3.14; // Esto causará un error porque x no está definido
```

### 50. Métodos de Arreglo (some, every, find):
`some` verifica si algunos elementos pasan una prueba, `every` verifica si todos los elementos pasan una prueba, `find` devuelve el valor del primer elemento que pasa una prueba.

```javascript
let arreglo = [1, 2, 3, 4, 5];

let mayorQueCuatro = arreglo.some(num => num > 4); // true
let todosMayoresQueCero = arreglo.every(num => num > 0); // true
let primeroMayorQueDos = arreglo.find(num => num > 2); // 3
```

### 51. Expresiones de Función con Nombre:
Una expresión de función con nombre es muy similar a una declaración de función, excepto que se crea como parte de una expresión.

```javascript
let miFuncion = function func() {
    console.log(func);
};
miFuncion();
```

### 52. Codificación/Decodificación en JavaScript:
Las funciones `encodeURI` y `decodeURI` se utilizan para codificar y decodificar un URI.

```javascript
let uri = "mi prueba.asp?nombre=stale&auto=saab";
let codificado = encodeURI(uri);
console.log(codificado); // mi%20prueba.asp?nombre=st%C3%A51e&auto=saab
console.log(decodeURI(codificado)); // mi prueba.asp?nombre=stale&auto=saab
```

### 53. Parámetros Predeterminados:
Los parámetros predeterminados de función permiten inicializar parámetros nombrados con valores predeterminados si no se pasa ningún valor o se pasa `undefined`.

```javascript
function multiplicar(a, b = 1) {
    return a * b;
}

console.log(multiplicar(5, 2)); // 10
console.log(multiplicar(5)); // 5
```

### 54. Animación en JavaScript:
JavaScript se puede utilizar para mover elementos en la página, crear un carrusel de imágenes u otras formas de animación.

```javascript
let pos = 0;
let caja = document.getElementById("animar");

let id = setInterval(frame, 5);
function frame() {
    if (pos == 350) {
        clearInterval(id);
    } else {
        pos++;
        caja.style.top = pos + "px";
        caja.style.left = pos + "px";
    }
}
```

### 55. BOM (Modelo de Objetos del Navegador):
El BOM permite que JavaScript "hable" con el navegador, incluye objetos como `navigator`, `history`, `screen`, `location` y `document`, que también es el punto de entrada al contenido de la página web.

```javascript
console.log(window.innerHeight); // altura interna de la ventana del navegador
```

### 56. Web Workers:
Los Web Workers son un medio simple para que el contenido web ejecute scripts en hilos en segundo plano.

```javascript
let miWorker = new Worker("worker.js");
miWorker.postMessage([primero.value, segundo.value]);
miWorker.onmessage = function(e) {
    resultado.textContent = e.data;
}
```

### 57. Eventos Enviados por el Servidor (SSE):
Server-Sent Events (SSE) es un estándar que permite que una página web reciba actualizaciones de un servidor.

```javascript
if(typeof(EventSource) !== "undefined") {
    let fuente = new EventSource("demo_sse.php");
    fuente.onmessage = function(evento) {
        document.getElementById("resultado").innerHTML += evento.data + "<br>";
    };
}
```

### 58. Fetch API:
La Fetch API proporciona una interfaz JavaScript para acceder y manipular solicitudes y respuestas HTTP.

```javascript
fetch('https://api.github.com/users/github')
.then(respuesta => respuesta.json())
.then(datos => console.log(datos));
```

### 59. Abreviatura de Propiedades de Objeto:
En situaciones donde la clave y el valor que estás asignando a la clave en el objeto que estás creando son los mismos, puedes usar una abreviatura para crear propiedades.

```javascript
let nombre = 'Juan';
let edad = 25;

let persona = {nombre, edad};
console.log(persona); // {nombre: 'Juan', edad: 25}
```

### 60. WeakMap:
El objeto WeakMap es una colección de pares clave/valor en la que las claves están débilmente referenciadas. Las claves deben ser objetos y los valores pueden ser valores arbitrarios.

```javascript
let weakmap = new WeakMap();
let obj = {}
weakmap.set(obj, 'foo');
console.log(weakmap.get(obj)); // 'foo'
```

### 61. WeakSet:
El objeto WeakSet te permite almacenar objetos débilmente mantenidos en una colección.

```javascript
let weakSet = new WeakSet();
let obj = {}
weakSet.add(obj);
console.log(weakSet.has(obj)); // true
```

### 62. Expresiones Regulares en JavaScript:
Una expresión regular es una secuencia de caracteres que forma un patrón de búsqueda. Se utiliza para buscar, extraer y reemplazar texto.

```javascript
let re = new RegExp('ab+c');
let literal = /ab+c;
console.log(re.test('abc')); // true
console.log(literal.test('abc')); // true
```

### 63. Proxies:
Proporcionan una forma de envolver otro objeto e interceptar operaciones, como leer/escribir propiedades y otras, opcionalmente manejándolas o haciéndolas comportarse de manera diferente.

```javascript
let objetivo = {};  
let proxy = new Proxy(objetivo, {});

proxy.prueba = 5; // escribir en proxy también escribe en objetivo
console.log(objetivo.prueba); // 5
console.log(proxy.prueba); // 5
```

### 64. Reflect API:
Proporciona métodos para operaciones JavaScript interceptables. Los métodos son los mismos que los de los manejadores de proxy.

```javascript
let obj = {};  
Reflect.set(obj, 'propiedad', 'valor');  
console.log(obj.propiedad); // 'valor'
```

### 65. Performance API:
Proporciona acceso a información relacionada con el rendimiento mejorada con una marca de tiempo de alta resolución.

```javascript
const tiempoInicio = performance.now();

// El evento a medir va aquí:

const tiempoFin = performance.now();  
console.log(`El evento tomó ${tiempoFin - tiempoInicio} milisegundos.`);
```

### 66. Iteradores y Generadores Asíncronos:
Permiten que las funciones asíncronas se pausen en el medio, una línea a la vez, y se reanuden solo cuando un valor está listo, perfecto para trabajar con flujos y otras fuentes de datos asíncronas.

```javascript
async function* generadorAsincrono() {  
    let i = 0;  
    while (i < 3) {  
        yield i++;  
    }  
}

for await (let num of generadorAsincrono()) {  
    console.log(num);  
}
```

### 67. BigInt:
Un entero de precisión arbitraria.

```javascript
const numeroGrande = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
console.log(numeroGrande); // Salida: 9007199254740992n
```

### 68. Operador de Encadenamiento Opcional `?.`:
Permite acceder de manera segura a objetos anidados sin verificar la presencia de cada uno de ellos.

```javascript
let usuario = {}; // usuario no tiene dirección
console.log(usuario?.direccion?.calle); // undefined (sin error)
```

### 69. Operador de Fusión Nula `??`:
Devuelve el primer argumento si no es `null`/`undefined`. De lo contrario, el segundo.

```javascript
let altura = 0;
console.log(altura ?? 100); // 0
```

### 70. Etiquetas de Bucle:
Una etiqueta permite romper/continuar bucles externos desde un bucle anidado.

```javascript
externo: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let entrada = prompt(`Valor en coordenadas (${i},${j})`);
        if (!entrada) break externo; // si es una línea vacía o cancelar, salir de ambos bucles
    }
}
console.log('¡Hecho!');
```

### 71. Elementos Personalizados:
Permite definir o personalizar componentes web.

```javascript
class MiElemento extends HTMLElement {
    // la funcionalidad del elemento va aquí
}

customElements.define('mi-elemento', MiElemento);
```

### 72. Shadow DOM:
Encapsula estilo y estructura para componentes web.

```javascript
const raizShadow = this.attachShadow({mode: 'open'});
const span = document.createElement('span');
span.textContent = '¡Hola desde el shadow!';
raizShadow.appendChild(span);
```

### 73. Enlace de Funciones:
El acto de fijar el contexto de una función en el momento de creación.

```javascript
this.manejarClic = this.manejarClic.bind(this);
```

### 74. GlobalThis:
Una forma universal de acceder al valor global `this` (también conocido como objeto global) en todos los entornos.

```javascript
console.log(globalThis.Math === Math); // true
```

### 75. Operadores de Asignación Lógica:
Realizan una operación lógica y asignación en un solo paso.

```javascript
a ||= b; // OR y asignación
a &&= b; // AND y asignación
a ??= b; // Fusión Nula y asignación
```

### 76. Método `at()` de Arreglos:
Permite obtener el elemento en un índice dado, con soporte para índices negativos.

```javascript
let arreglo = [1, 2, 3, 4, 5];
console.log(arreglo.at(-1)); // 5
```

### 77. Separadores Numéricos:
Permite usar guión bajo como separador en literales numéricos.

```javascript
let milMillones = 1_000_000_000; // guión bajo como separador
console.log(milMillones); // 1000000000
```

### 78. Await de Nivel Superior:
Permite usar `await` en el nivel superior de un módulo.

```javascript
// await de nivel superior es válido
const respuesta = await fetch('....');
```

### 79. Propuesta de Coincidencia de Patrones:
Permite coincidir y desestructurar datos de una manera más profunda y expresiva.

```javascript
match (valor) {
    when ({ a: 1, b }) -> b
    else -> throw new Error('no coincidió')
}
```

### 80. Propuesta de Operador de Tubería (Pipeline):
Permite encadenar funciones de una manera más legible y funcional.

```javascript
// Usando el operador de tubería
let resultado = "hola" |> dobleDecir |> capitalizar |> exclamar;
```

### 81. Currificación:
La currificación es el proceso de convertir una función con múltiples argumentos en una secuencia de funciones, cada una tomando un solo argumento.

```javascript
function multiplicar(a) {
    return function(b) {
        return a * b;
    };
}

var multiplicarPorDos = multiplicar(2);
console.log(multiplicarPorDos(4)); // Salida: 8
```

### 82. Currificación con lodash:
La función `curry` de lodash se puede usar para currificar.

```javascript
const _ = require('lodash');

function multiplicar(a, b, c) {
    return a * b * c;
}

const multiplicarCurrificado = _.curry(multiplicar);
console.log(multiplicarCurrificado(2)(3)(4)); // Salida: 24
```

### 83. Composición de Funciones:
La composición de funciones es combinar múltiples funciones para formar una nueva función.

```javascript
function sumar(a) {
    return a + 1;
}

function multiplicar(b) {
    return b * 2;
}

var funcionCompuesta = (x) => multiplicar(sumar(x));

console.log(funcionCompuesta(3)); // Salida: 8
```

### 84. Memoización:
La memoización es una técnica utilizada para almacenar en caché los resultados de llamadas a funciones costosas para mejorar el rendimiento.

```javascript
function fibonacci(n, cache = {}) {
    if (n in cache) {
        return cache[n];
    }

    if (n <= 2) {
        return 1;
    }

    const resultado = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);
    cache[n] = resultado;
    return resultado;
}

console.log(fibonacci(10)); // Salida: 55
```

### 85. Trampas de Proxy:
Las trampas de proxy son los métodos que se pueden definir en el objeto manejador para personalizar el comportamiento del objeto proxy.

```javascript
const manejador = {
    get(objetivo, propiedad) {
        console.log(`Accedido a ${propiedad}`);
        return objetivo[propiedad];
    },
};

const proxy = new Proxy({}, manejador);

console.log(proxy.nombre); // Salida: Accedido a nombre, undefined
```

### 86. Generadores de Funciones:
Los generadores de funciones son una combinación de generadores y funciones, lo que te permite definir funciones generadoras reutilizables.

```javascript
function* generarNumeros() {
    let numero = 0;
    while (true) {
        yield numero++;
    }
}

const generadorNumeros = generarNumeros();

console.log(generadorNumeros.next().value); // Salida: 0
console.log(generadorNumeros.next().value); // Salida: 1
```

### 87. Campos Privados de Clase:
Los campos privados de clase son campos de clase que están limitados a la clase y no se pueden acceder fuera de ella.

```javascript
class Persona {
    #nombre;

    constructor(nombre) {
        this.#nombre = nombre;
    }

    obtenerNombre() {
        return this.#nombre;
    }
}

const persona = new Persona('Juan');

console.log(persona.obtenerNombre()); // Salida: Juan
console.log(persona.#nombre); // SyntaxError: Campo privado '#nombre' debe declararse en una clase envolvente
```

### 88. Encadenamiento Opcional:
El encadenamiento opcional te permite acceder a propiedades anidadas de un objeto sin preocuparte si alguna propiedad intermedia es `null` o `undefined`.

```javascript
const usuario = {
    nombre: 'Juan',
    direccion: {
        ciudad: 'Nueva York',
    },
};

console.log(usuario.direccion?.ciudad); // Salida: Nueva York
console.log(usuario.direccion?.pais); // Salida: undefined
```

### 89. Sintaxis de Propagación de Objetos:
La sintaxis de propagación de objetos permite fusionar propiedades de múltiples objetos en un nuevo objeto.

```javascript
const persona = { nombre: 'Juan' };
const detalles = { edad: 30, pais: 'EE.UU.' };

const fusionado = { ...persona, ...detalles };

console.log(fusionado); // Salida: { nombre: 'Juan', edad: 30, pais: 'EE.UU.' }
```

### 90. Web Workers:
Los Web Workers permiten ejecutar código JavaScript en segundo plano, fuera del hilo principal, para mejorar el rendimiento y la capacidad de respuesta.

```javascript
// Hilo principal
const worker = new Worker('worker.js');

worker.postMessage('¡Hola desde el hilo principal!');

worker.onmessage = (evento) => {
    console.log(`Recibido: ${evento.data}`);
};

// Hilo worker (worker.js)
self.onmessage = (evento) => {
    console.log(`Recibido en el worker: ${evento.data}`);
    self.postMessage('¡Hola desde el hilo worker!');
};
```

### 91. Objetos Incorporados Proxy:
Puedes crear proxies para objetos incorporados como Array, Date y Function para interceptar y personalizar su comportamiento.

```javascript
const arregloProxy = new Proxy([], {
    set(objetivo, propiedad, valor) {
        console.log(`Estableciendo ${valor} en índice ${propiedad}`);
        return Reflect.set(objetivo, propiedad, valor);
    },
});

arregloProxy.push(1); // Salida: Estableciendo 1 en índice 0
```

### 92. Objetos Iterables Personalizados:
Puedes crear objetos iterables personalizados implementando el protocolo de iterador.

```javascript
const iterable = {
    items: ['a', 'b', 'c'], 
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.items.length) {
                    return { value: this.items[index++], done: false };
                }
                return { done: true };
            },
        };
    },
};

for (const item of iterable) {
    console.log(item);
}
```

### 93. Decoradores:
Los decoradores permiten agregar funcionalidad a clases, métodos y propiedades en tiempo de diseño.

```javascript
function log(objetivo, nombre, descriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args) {
        console.log(`Llamando a ${nombre} con argumentos ${args}`);
        return original.apply(this, args);
    };

    return descriptor;
}

class Calculadora {
    @log
    sumar(a, b) {
        return a + b;
    }
}

const calc = new Calculadora();
console.log(calc.sumar(2, 3)); // Salida: Llamando a sumar con argumentos 2,3, 5
```

### 94. Throttling:
El throttling es una técnica para limitar el número de veces que se puede llamar a una función dentro de un marco de tiempo específico.

```javascript
function throttle(funcion, limite) {
    let enThrottle;
    return function (...args) {
        if (!enThrottle) {
            funcion.apply(this, args);
            enThrottle = true;
            setTimeout(() => (enThrottle = false), limite);
        }
    };
}

function registrarMensaje() {
    console.log('Mensaje registrado');
}

const registroThrottled = throttle(registrarMensaje, 1000);
registroThrottled(); // Salida: Mensaje registrado
registroThrottled(); // (Sin salida)
```

### 95. Debouncing:
El debouncing es una técnica para retrasar la ejecución de una función hasta que haya pasado una cantidad específica de tiempo sin que se llame a la función nuevamente.

```javascript
function debounce(funcion, retraso) {
    let temporizador;
    return function (...args) {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => funcion.apply(this, args), retraso);
    };
}

function guardarDatos() {
    console.log('Datos guardados');
}

const guardarDebounced = debounce(guardarDatos, 1000);
guardarDebounced(); // (Sin salida)
guardarDebounced(); // (Sin salida)
guardarDebounced(); // Salida: Datos guardados
```

### 96. Object.freeze:
El método `Object.freeze` congela un objeto, haciéndolo inmutable al evitar agregar, modificar o eliminar propiedades.

```javascript
const obj = {
    nombre: 'Juan',
    edad: 30,
};

Object.freeze(obj);
obj.edad = 40; // La asignación se ignora en modo estricto o lanza un error en modo no estricto
console.log(obj.edad); // Salida: 30
```

### 97. Object.seal:
El método `Object.seal` sella un objeto, evitando la adición o eliminación de propiedades, pero permitiendo la modificación de propiedades existentes.

```javascript
const obj = {
    nombre: 'Juan',
    edad: 30,
};

Object.seal(obj);
delete obj.edad; // La eliminación se ignora
obj.nombre = 'Juana'; // La propiedad se puede modificar
obj.genero = 'Masculino'; // La adición de propiedad se ignora

console.log(obj); // Salida: { nombre: 'Juana', edad: 30 }
```

### 98. Object.preventExtensions:
El método `Object.preventExtensions` evita la adición de nuevas propiedades a un objeto mientras permite la modificación o eliminación de propiedades existentes.

```javascript
const obj = {
    nombre: 'Juan',
    edad: 30,
};

Object.preventExtensions(obj);
obj.nombre = 'Juana'; // La propiedad se puede modificar
obj.genero = 'Masculino'; // La adición de propiedad se ignora

console.log(obj); // Salida: { nombre: 'Juana', edad: 30 }
```

### 99. FlatMap:
El método `flatMap` combina los métodos `map` y `flat`, permitiendo mapear cada elemento a un nuevo arreglo y luego aplanar los arreglos resultantes en un solo arreglo.

```javascript
const numeros = [1, 2, 3];

const resultado = numeros.flatMap((x) => [x, x * 2]);
console.log(resultado); // Salida: [1, 2, 2, 4, 3, 6]
```

### 100. Object.fromEntries:
El método `Object.fromEntries` transforma una lista de pares clave-valor en un objeto.

```javascript
const entradas = [
    ['nombre', 'Juan'],
    ['edad', 30],
];

const obj = Object.fromEntries(entradas);
console.log(obj); // Salida: { nombre: 'Juan', edad: 30 }
```

### 101. String.replaceAll:
El método `replaceAll` reemplaza todas las ocurrencias de una cadena o expresión regular especificada con otra cadena.

```javascript
const oracion = 'El rápido zorro marrón salta sobre el perro perezoso.';
const nuevaOracion = oracion.replaceAll('el', 'un');
console.log(nuevaOracion); // Salida: El rápido zorro marrón salta sobre un perro perezoso.
```

### 102. Object.hasOwn:
El método `hasOwn` verifica si un objeto tiene una propiedad definida directamente en sí mismo (no heredada de la cadena de prototipos).

```javascript
const obj = {
    nombre: 'Juan',
};

console.log(obj.hasOwn('nombre')); // Salida: true
console.log(obj.hasOwn('toString')); // Salida: false
```

### 103. Intl.ListFormat:
El objeto `Intl.ListFormat` proporciona formato sensible al idioma de listas.

```javascript
const frutas = ['manzana', 'banana', 'naranja'];
const formatoLista = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

const listaFormateada = formatoLista.format(frutas);
console.log(listaFormateada); // Salida: manzana, banana y naranja
```

### 104. Intl.RelativeTimeFormat:
El objeto `Intl.RelativeTimeFormat` proporciona formato sensible al idioma de tiempo relativo.

```javascript
const formatoTiempo = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
console.log(formatoTiempo.format(-2, 'day')); // Salida: hace 2 días
```

### 105. File API:
La File API proporciona una forma de interactuar con archivos en el dispositivo del usuario usando JavaScript.

```javascript
const input = document.getElementById('entradaArchivo');

input.addEventListener('change', (evento) => {
    const archivo = evento.target.files[0];
    const lector = new FileReader();

    lector.addEventListener('load', (evento) => {
        const contenido = evento.target.result;
        console.log(contenido);
    });

    lector.readAsText(archivo);
});
```

### 106. Intersection Observer API:
La Intersection Observer API permite detectar cuando un elemento entra o sale del viewport.

```javascript
const elemento = document.getElementById('objetivo');

const callback = (entradas) => {
    entradas.forEach((entrada) => {
        console.log(entrada.isIntersecting ? 'Elemento entró' : 'Elemento salió');
    });
};

const opciones = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

const observador = new IntersectionObserver(callback, opciones);
observador.observe(elemento);
```
