# Guía Completa de TypeScript: Tipos, Sintaxis y Características Avanzadas

TypeScript es un poderoso superset tipado de JavaScript que añade tipos estáticos al lenguaje, permitiendo detectar errores en tiempo de compilación y mejorar la experiencia de desarrollo. A continuación, presento una guía exhaustiva de todos los conceptos fundamentales y avanzados de TypeScript.

## Introducción a TypeScript

TypeScript es un lenguaje de programación desarrollado por Microsoft que **extiende JavaScript** añadiendo tipos estáticos. A diferencia de JavaScript que es dinámico, TypeScript realiza verificaciones de tipo durante la compilación, lo que ayuda a:

- Detectar errores temprano
- Mejorar la autocompletación en IDEs
- Facilitar el mantenimiento de código a gran escala
- Documentar mejor el código a través de tipos

**Ejemplo básico:**
```typescript
// JavaScript
function sum(a, b) {
  return a + b;
}

// TypeScript
function sum(a: number, b: number): number {
  return a + b;
}
```

## Compilador de TypeScript (TSC)

El compilador de TypeScript (`tsc`) convierte código TypeScript (.ts) en JavaScript (.js) compatible con navegadores.

**Instalación y uso:**
```bash
npm install -g typescript  # Instalación global
tsc --init                # Crea tsconfig.json
tsc archivo.ts            # Compila a JavaScript
npx tsc                   # Ejecuta el compilador
```

El archivo `tsconfig.json` configura cómo TypeScript compila el proyecto, con opciones como:
- `target`: Versión de JS a generar (ES5, ES6, etc.)
- `strict`: Habilita todas las verificaciones de tipo estrictas
- `outDir`: Directorio de salida para los archivos JS

## Tipos Básicos (Primitivos)

TypeScript incluye los tipos primitivos de JavaScript más algunos adicionales:

1. **boolean**: `true` o `false`
   ```typescript
   let isDone: boolean = false;
   ```

2. **number**: Números (enteros, decimales, hexadecimales, binarios)
   ```typescript
   let decimal: number = 6;
   let hex: number = 0xf00d;
   let binary: number = 0b1010;
   ```

3. **string**: Cadenas de texto
   ```typescript
   let color: string = "blue";
   color = 'red';
   let fullName: string = `Juan Pérez`;
   let age: number = 30;
   let sentence: string = `Hola, me llamo ${fullName} y tengo ${age} años.`;
   ```

4. **bigint**: Para números enteros muy grandes
   ```typescript
   let bigNumber: bigint = 100n;
   ```

5. **symbol**: Valores únicos e inmutables
   ```typescript
   let sym1: symbol = Symbol();
   let sym2: symbol = Symbol("key");
   ```

## Asignación de Tipos

TypeScript ofrece dos formas principales de asignar tipos:

1. **Explícita**: El desarrollador declara el tipo
   ```typescript
   let nombre: string = "Carlos";
   ```

2. **Implícita**: TypeScript infiere el tipo
   ```typescript
   let nombre = "Carlos"; // TS infiere que es string
   ```

**Ejemplo de inferencia problemática:**
```typescript
let jsonData = JSON.parse("55"); // Tipo any (peligroso)
// Solución:
let jsonData: number = JSON.parse("55");
```

Para evitar el tipo `any` implícito, activar `noImplicitAny` en `tsconfig.json`.

## Tipos Especiales

1. **any**: Desactiva la verificación de tipos (útil para migraciones o código dinámico)
   ```typescript
   let variableDinamica: any = "texto";
   variableDinamica = 42; // Válido
   ```

2. **unknown**: Similar a `any` pero más seguro (requiere verificación de tipos)
   ```typescript
   let valorDesconocido: unknown = "Hola";
   if (typeof valorDesconocido === "string") {
     console.log(valorDesconocido.toUpperCase()); // Ahora seguro
   }
   ```

3. **never**: Representa valores que nunca ocurren (funciones que lanzan errores o bucles infinitos)
   ```typescript
   function error(mensaje: string): never {
     throw new Error(mensaje);
   }
   ```

4. **void**: Ausencia de valor (común en funciones sin retorno)
   ```typescript
   function logMensaje(mensaje: string): void {
     console.log(mensaje);
   }
   ```

5. **null/undefined**: Tipos para estos valores primitivos
   ```typescript
   let n: null = null;
   let u: undefined = undefined;
   ```

## Arrays y Tuples

### Arrays
Los arrays en TypeScript pueden tiparse de varias formas:

1. **Sintaxis básica**:
   ```typescript
   let numeros: number[] = [1, 2, 3];
   let palabras: string[] = ["hola", "mundo"];
   ```

2. **Genéricos**:
   ```typescript
   let numeros: Array<number> = [1, 2, 3];
   ```

3. **Arrays inmutables (readonly)**:
   ```typescript
   const colores: readonly string[] = ["rojo", "verde"];
   // colores.push("azul"); // Error: push no existe en readonly
   ```

4. **Arrays multidimensionales**:
   ```typescript
   let matriz: number[][] = [
     [1, 2],
     [3, 4]
   ];
   ```

### Tuples
Las tuplas permiten arrays con tipos específicos en cada posición:

```typescript
// Tupla básica
let persona: [string, number] = ["Juan", 30];

// Tupla con nombre (TypeScript 4.0+)
let punto: [x: number, y: number] = [10, 20];

// Tupla readonly
let datos: readonly [string, number] = ["Ana", 25] as const;

// Desestructuración
let [nombre, edad] = persona;
console.log(nombre); // "Juan"

// Uso común con React useState
const [count, setCount] = useState<number>(0);
```

**Ejemplo avanzado con tuplas:**
```typescript
type HTTPResponse = [number, string, boolean?];

const respuestaExitosa: HTTPResponse = [200, "OK"];
const respuestaError: HTTPResponse = [404, "Not Found", false];
```

## Tipos de Objetos

TypeScript permite definir la forma exacta de los objetos:

```typescript
// Sintaxis básica
let usuario: { nombre: string; edad: number } = {
  nombre: "Carlos",
  edad: 30
};

// Propiedades opcionales
interface Config {
  ruta: string;
  tiempo?: number; // Opcional
}

// Index signatures (para objetos dinámicos)
let diccionario: { [key: string]: number } = {
  "manzanas": 5,
  "naranjas": 10
};

// Objetos readonly
const ubicacion: Readonly<{ lat: number; lng: number }> = {
  lat: 40.7128,
  lng: -74.0060
};
// ubicacion.lat = 0; // Error: propiedad readonly
```

## Enums (Enumeraciones)

Los enums permiten definir un conjunto de constantes con nombre:

### Enums numéricos
```typescript
enum Direccion {
  Norte,    // 0
  Este,     // 1
  Sur,      // 2
  Oeste     // 3
}

let dir: Direccion = Direccion.Norte;

enum StatusCode {
  Exito = 200,
  NoEncontrado = 404,
  ErrorServidor = 500
}

function manejarError(codigo: StatusCode) {
  // ...
}
```

### Enums de strings
```typescript
enum Comando {
  Arriba = "MOVER_ARRIBA",
  Abajo = "MOVER_ABAJO",
  Izquierda = "MOVER_IZQUIERDA",
  Derecha = "MOVER_DERECHA"
}
```

### Enums constantes (optimizados)
```typescript
const enum Dia {
  Lunes,
  Martes,
  Miercoles
}

// Se compila a:
let hoy = 0; // Dia.Lunes → 0
```

## Type Aliases e Interfaces

### Type Aliases
Permiten crear nuevos nombres para tipos existentes:

```typescript
type ID = string | number;
type Coordenadas = [number, number];
type Callback = (data: string) => void;

// Objetos complejos
type Usuario = {
  id: ID;
  nombre: string;
  email: string;
  edad?: number;
  direccion: {
    calle: string;
    ciudad: string;
  };
};
```

### Interfaces
Especializadas para definir la forma de objetos:

```typescript
interface Persona {
  nombre: string;
  edad: number;
  saludar(): void;
}

interface Empleado extends Persona {
  puesto: string;
  departamento: string;
}

const juan: Empleado = {
  nombre: "Juan",
  edad: 35,
  puesto: "Desarrollador",
  departamento: "TI",
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};
```

**Diferencias clave:**
- Interfaces pueden extenderse (`extends`)
- Type Aliases pueden representar cualquier tipo (uniones, tuplas, etc.)
- Interfaces pueden ser reabiertas para añadir propiedades

## Tipos Union e Intersection

### Union Types (`|`)
Permiten que una variable sea de varios tipos:

```typescript
function imprimirId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

### Intersection Types (`&`)
Combinan múltiples tipos en uno:

```typescript
interface Nombre {
  nombre: string;
}

interface Edad {
  edad: number;
}

type Persona = Nombre & Edad;

const juan: Persona = {
  nombre: "Juan",
  edad: 30
};
```

## Funciones en TypeScript

TypeScript añade tipado fuerte a las funciones:

```typescript
// Parámetros y retorno tipados
function sumar(a: number, b: number): number {
  return a + b;
}

// Parámetros opcionales
function crearNombre(nombre: string, apellido?: string): string {
  return apellido ? `${nombre} ${apellido}` : nombre;
}

// Parámetros por defecto
function crearUsuario(nombre: string, rol: string = "usuario") {
  return { nombre, rol };
}

// Parámetros rest (siempre array)
function sumarNumeros(...numeros: number[]): number {
  return numeros.reduce((a, b) => a + b, 0);
}

// Funciones como tipos
type Operacion = (a: number, b: number) => number;
const multiplicar: Operacion = (a, b) => a * b;

// Sobrecarga de funciones
function crearFecha(timestamp: number): Date;
function crearFecha(mes: number, dia: number, año: number): Date;
function crearFecha(mesOStamp: number, dia?: number, año?: number): Date {
  return dia === undefined || año === undefined
    ? new Date(mesOStamp)
    : new Date(año, mesOStamp, dia);
}
```

## Casting (Type Assertions)

Permiten decirle al compilador que confíe en tu conocimiento del tipo:

```typescript
// Sintaxis "as"
let valor: unknown = "esto es un string";
let longitud: number = (valor as string).length;

// Sintaxis <tipo>
let otroValor: unknown = "otro string";
let otraLongitud: number = (<string>otroValor).length;

// Casting con DOM
const input = document.getElementById("miInput") as HTMLInputElement;
input.value = "Hola";

// Casting forzoso (cuando estás seguro)
let objeto: unknown = {};
let usuario = (objeto as { nombre: string }).nombre; // Cuidado: posible runtime error!
```

## Clases en TypeScript

TypeScript añade tipado y modificadores de acceso a las clases:

```typescript
class Persona {
  // Propiedades
  nombre: string;
  private edad: number;
  protected id: string;
  readonly dni: string;

  // Constructor
  constructor(nombre: string, edad: number, dni: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.dni = dni;
    this.id = Math.random().toString(36).substring(2);
  }

  // Métodos
  saludar(): void {
    console.log(`Hola, soy ${this.nombre}`);
  }

  // Getter/Setter
  get edadActual(): number {
    return this.edad;
  }

  set edadActual(nuevaEdad: number) {
    if (nuevaEdad > 0) {
      this.edad = nuevaEdad;
    }
  }
}

// Herencia
class Empleado extends Persona {
  puesto: string;

  constructor(nombre: string, edad: number, dni: string, puesto: string) {
    super(nombre, edad, dni);
    this.puesto = puesto;
  }

  // Override
  saludar(): void {
    super.saludar();
    console.log(`Trabajo como ${this.puesto}`);
  }
}

// Clases abstractas
abstract class Figura {
  abstract area(): number;
  abstract perimetro(): number;
}

class Rectangulo extends Figura {
  constructor(private ancho: number, private alto: number) {
    super();
  }

  area(): number {
    return this.ancho * this.alto;
  }

  perimetro(): number {
    return 2 * (this.ancho + this.alto);
  }
}
```

## Genéricos

Los genéricos permiten crear componentes reutilizables que funcionan con múltiples tipos:

```typescript
// Función genérica
function identidad<T>(arg: T): T {
  return arg;
}

let salida = identidad<string>("hola");
let salidaNum = identidad<number>(42);

// Clases genéricas
class Contenedor<T> {
  constructor(private contenido: T) {}

  obtenerContenido(): T {
    return this.contenido;
  }
}

let contString = new Contenedor<string>("texto");
let contNum = new Contenedor<number>(100);

// Restricciones con extends
interface Longitud {
  length: number;
}

function logLongitud<T extends Longitud>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Múltiples parámetros de tipo
function mezclar<T, U>(primero: T, segundo: U): T & U {
  return { ...primero, ...segundo };
}

// Parámetros por defecto
interface Paginacion<T = any> {
  datos: T[];
  pagina: number;
  porPagina: number;
}

// Tipos condicionales
type NombreOEdad<T> = T extends { nombre: string } ? string : number;
```

## Tipos de Utilidad

TypeScript proporciona varios tipos de utilidad para transformar tipos:

1. **Partial**: Hace todas las propiedades opcionales
   ```typescript
   interface Usuario {
     nombre: string;
     edad: number;
   }
   
   let usuarioParcial: Partial<Usuario> = { nombre: "Juan" };
   ```

2. **Required**: Hace todas las propiedades requeridas
   ```typescript
   interface Config {
     ruta?: string;
     tiempo?: number;
   }
   
   let configRequerida: Required<Config> = {
     ruta: "/",
     tiempo: 1000
   };
   ```

3. **Readonly**: Hace todas las propiedades readonly
   ```typescript
   let usuarioReadonly: Readonly<Usuario> = {
     nombre: "Ana",
     edad: 25
   };
   // usuarioReadonly.edad = 26; // Error
   ```

4. **Record**: Crea un tipo con un conjunto de propiedades de un tipo específico
   ```typescript
   let usuarios: Record<string, Usuario> = {
     "user1": { nombre: "Juan", edad: 30 },
     "user2": { nombre: "Ana", edad: 25 }
   };
   ```

5. **Pick**: Selecciona solo algunas propiedades
   ```typescript
   type UsuarioBasico = Pick<Usuario, "nombre">;
   ```

6. **Omit**: Omite algunas propiedades
   ```typescript
   type UsuarioSinEdad = Omit<Usuario, "edad">;
   ```

7. **Exclude**: Excluye tipos de una unión
   ```typescript
   type SoloNumeros = Exclude<string | number | boolean, string | boolean>;
   ```

8. **Extract**: Extrae tipos de una unión
   ```typescript
   type SoloString = Extract<string | number | boolean, string>;
   ```

9. **NonNullable**: Elimina null y undefined
   ```typescript
   type ValoresValidos = NonNullable<string | number | null | undefined>;
   ```

10. **ReturnType**: Obtiene el tipo de retorno de una función
    ```typescript
    type Fn = () => Usuario;
    type RetornoFn = ReturnType<Fn>; // Usuario
    ```

11. **Parameters**: Obtiene los parámetros de una función como tupla
    ```typescript
    type ParametrosFn = Parameters<(nombre: string, edad: number) => void>;
    // [string, number]
    ```

## keyof y Tipos Mapeados

### keyof
Obtiene las claves de un tipo como unión de strings:

```typescript
interface Persona {
  nombre: string;
  edad: number;
  direccion: string;
}

type ClavesPersona = keyof Persona; // "nombre" | "edad" | "direccion"

function obtenerPropiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Tipos Mapeados
Permiten transformar propiedades de tipos:

```typescript
type Opciones<T> = {
  [P in keyof T]?: T[P];
};

type PersonaOpcional = Opciones<Persona>;
// Equivalente a:
// {
//   nombre?: string;
//   edad?: number;
//   direccion?: string;
// }

// Hacer todas las propiedades readonly
type SoloLectura<T> = {
  readonly [P in keyof T]: T[P];
};

// Hacer todas las propiedades nullables
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

## Null y Undefined

TypeScript maneja `null` y `undefined` de forma estricta cuando `strictNullChecks` está activado:

```typescript
// Con strictNullChecks
let s: string = "hola";
// s = null; // Error
// s = undefined; // Error

// Unión explícita
let sn: string | null | undefined = "hola";
sn = null;
sn = undefined;
```

### Operadores útiles:

1. **Optional Chaining (`?.`)**
   ```typescript
   interface Usuario {
     perfil?: {
       nombre?: string;
       edad?: number;
     };
   }
   
   let usuario: Usuario = {};
   let nombre = usuario.perfil?.nombre; // string | undefined
   ```

2. **Nullish Coalescing (`??`)**
   ```typescript
   let input: string | null | undefined = obtenerInput();
   let valor = input ?? "default"; // Usa "default" solo si input es null o undefined
   ```

3. **Non-null Assertion Operator (`!`)**
   ```typescript
   function obtenerLongitud(str: string | null): number {
     return str!.length; // Asegura que str no es null (cuidado: puede causar runtime error)
   }
   ```

## Definitely Typed y @types

Para usar bibliotecas JavaScript en TypeScript, la comunidad mantiene definiciones de tipos en Definitely Typed:

```bash
npm install --save-dev @types/jquery
npm install --save-dev @types/lodash
```

Estos paquetes proporcionan tipos para bibliotecas populares que no los incluyen nativamente.

## TypeScript 5+ Novedades

1. **Template Literal Types**:
   ```typescript
   type Color = "red" | "green" | "blue";
   type HexColor<T extends Color> = `#${string}`;
   
   let color: HexColor<Color> = "#ff0000";
   ```

2. **Improved Type Inference**:
   Mejor inferencia para tipos complejos y funciones.

3. **Performance Improvements**:
   Compilación más rápida y uso de memoria optimizado.

4. **New Decorators Standard**:
   Soporte para el estándar ECMAScript de decoradores.

5. **Const Type Parameters**:
   ```typescript
   function firstElement<const T>(arr: T[]): T {
     return arr[0];
   }
   
   // Infiere tipo literal "hello" en lugar de string
   const str = firstElement(["hello", "world"]);
   ```

## Buenas Prácticas

1. **Evitar `any`**: Usa tipos más específicos o `unknown` con verificación.
2. **Activar `strict`**: Habilita todas las comprobaciones de tipo estrictas.
3. **Usar interfaces para objetos públicos**: Mejor documentación y extensibilidad.
4. **Tipar funciones completas**: Incluyendo parámetros y retorno.
5. **Leverage Type Inference**: No anotes tipos donde TypeScript puede inferirlos.
6. **Usar utility types**: Para reducir duplicación y mantener consistencia.
7. **Documentar tipos complejos**: Con comentarios cuando sea necesario.

## Conclusión

TypeScript es una poderosa herramienta que lleva JavaScript al siguiente nivel, añadiendo un sistema de tipos robusto que ayuda a escribir código más seguro y mantenible. Desde tipos básicos hasta características avanzadas como genéricos y tipos condicionales, TypeScript ofrece un rico conjunto de características para manejar cualquier escenario de desarrollo.

Al dominar estos conceptos, podrás aprovechar al máximo TypeScript en tus proyectos, reduciendo errores, mejorando la colaboración en equipo y creando aplicaciones más robustas y escalables.