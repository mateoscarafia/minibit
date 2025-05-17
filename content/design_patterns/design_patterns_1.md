# Patrones de Diseño OOP en JavaScript

## 1. Factory Pattern (Patrón Fábrica)

El patrón Factory tiene como propósito principal encapsular la lógica de creación de objetos, permitiendo que las clases deleguen la instanciación a subclases o métodos especializados. Este patrón es especialmente útil cuando el tipo exacto del objeto no puede determinarse hasta el tiempo de ejecución, o cuando la creación requiere cierta complejidad que no debería estar en el código cliente. Centraliza el código de creación en un único lugar, facilitando el mantenimiento y evitando la duplicación. Además, promueve el bajo acoplamiento al eliminar dependencias directas entre clases concretas y el código que las utiliza. Es ideal para sistemas que necesitan flexibilidad para añadir nuevos tipos de productos sin modificar el código existente.

```javascript
class Auto {
  constructor(modelo, año) {
    this.modelo = modelo;
    this.año = año;
  }
  
  mostrarDetalles() {
    console.log(`Modelo: ${this.modelo}, Año: ${this.año}`);
  }
}

class AutoFactory {
  crearAuto(tipo) {
    switch(tipo) {
      case 'sedan':
        return new Auto('Toyota Corolla', 2023);
      case 'suv':
        return new Auto('Ford Explorer', 2024);
      case 'deportivo':
        return new Auto('Porsche 911', 2025);
      default:
        throw new Error('Tipo de auto no válido');
    }
  }
}

// Uso
const factory = new AutoFactory();
const miAuto = factory.crearAuto('suv');
miAuto.mostrarDetalles(); // Modelo: Ford Explorer, Año: 2024
```

## 2. Bridge Pattern (Patrón Puente)

El propósito del Bridge es separar radicalmente una abstracción (interfaz) de su implementación (lógica subyacente), permitiendo que ambas evolucionen independientemente. Resuelve el problema de la explosión de clases que ocurre cuando intentamos combinar múltiples variantes de abstracciones con múltiples variantes de implementaciones. Este patrón introduce una interfaz "puente" que media entre ambos mundos, haciendo posible cambiar implementaciones en tiempo de ejecución sin afectar la abstracción que el cliente usa. Es particularmente valioso en sistemas donde las abstracciones y las implementaciones deben extenderse mediante herencia, pero donde una jerarquía rígida sería insostenible. También facilita el cumplimiento del principio Open/Closed (abierto para extensión, cerrado para modificación).

```javascript
// Implementación
class Dispositivo {
  constructor() {
    if (this.constructor === Dispositivo) {
      throw new Error("No se puede instanciar una clase abstracta");
    }
  }
  
  encender() {}
  apagar() {}
  setVolumen(volumen) {}
}

class TV extends Dispositivo {
  constructor() {
    super();
    this.encendido = false;
    this.volumen = 50;
  }
  
  encender() {
    this.encendido = true;
    console.log('TV encendida');
  }
  
  apagar() {
    this.encendido = false;
    console.log('TV apagada');
  }
  
  setVolumen(volumen) {
    this.volumen = volumen;
    console.log(`Volumen de TV ajustado a ${volumen}`);
  }
}

// Abstracción
class ControlRemoto {
  constructor(dispositivo) {
    this.dispositivo = dispositivo;
  }
  
  togglePower() {
    if (this.dispositivo.encendido) {
      this.dispositivo.apagar();
    } else {
      this.dispositivo.encender();
    }
  }
  
  volumenUp() {
    this.dispositivo.setVolumen(this.dispositivo.volumen + 10);
  }
  
  volumenDown() {
    this.dispositivo.setVolumen(this.dispositivo.volumen - 10);
  }
}

// Uso
const tv = new TV();
const control = new ControlRemoto(tv);

control.togglePower(); // TV encendida
control.volumenUp();  // Volumen de TV ajustado a 60
```

## 3. Composite Pattern (Patrón Compuesto)

El Composite permite tratar objetos individuales y composiciones de objetos de manera uniforme mediante una estructura en árbol. Su propósito principal es permitir a los clientes tratar elementos simples y complejos de la misma forma, simplificando operaciones recursivas sobre estructuras jerárquicas. Este patrón es fundamental para representar jerarquías parte-todo donde no queremos que el cliente tenga que distinguir entre objetos hoja y compuestos. Es especialmente útil en sistemas de archivos, interfaces gráficas (donde componentes pueden contener otros componentes) o cualquier dominio con relaciones anidadas. El patrón simplifica el código cliente y facilita la adición de nuevos tipos de componentes, aunque puede hacer el diseño más general de lo necesario para casos simples.

```javascript
class Empleado {
  constructor(nombre, puesto) {
    this.nombre = nombre;
    this.puesto = puesto;
    this.subordinados = [];
  }
  
  agregar(empleado) {
    this.subordinados.push(empleado);
  }
  
  remover(empleado) {
    const index = this.subordinados.indexOf(empleado);
    if (index !== -1) {
      this.subordinados.splice(index, 1);
    }
  }
  
  mostrarEstructura(indent = '') {
    console.log(`${indent}${this.puesto}: ${this.nombre}`);
    this.subordinados.forEach(subordinado => {
      subordinado.mostrarEstructura(indent + '  ');
    });
  }
}

// Uso
const ceo = new Empleado('Juan Pérez', 'CEO');
const gerenteVentas = new Empleado('Ana Gómez', 'Gerente de Ventas');
const gerenteMarketing = new Empleado('Carlos Ruiz', 'Gerente de Marketing');

const vendedor1 = new Empleado('Laura Díaz', 'Vendedor');
const vendedor2 = new Empleado('Pedro Sánchez', 'Vendedor');
const diseñador = new Empleado('María López', 'Diseñador');

ceo.agregar(gerenteVentas);
ceo.agregar(gerenteMarketing);

gerenteVentas.agregar(vendedor1);
gerenteVentas.agregar(vendedor2);
gerenteMarketing.agregar(diseñador);

ceo.mostrarEstructura();
/*
CEO: Juan Pérez
  Gerente de Ventas: Ana Gómez
    Vendedor: Laura Díaz
    Vendedor: Pedro Sánchez
  Gerente de Marketing: Carlos Ruiz
    Diseñador: María López
*/
```

## 4. Facade Pattern (Patrón Fachada)

La Facade proporciona una interfaz simplificada a un subsistema complejo, ocultando su complejidad interna. Su propósito es crear un punto de acceso unificado y de alto nivel que haga más fácil usar el subsistema, reduciendo la curva de aprendizaje y minimizando las dependencias. Actúa como intermediario entre el cliente y los componentes internos, protegiendo al cliente de tener que conocer las relaciones y detalles de implementación. Este patrón no encapsula el subsistema, sino que ofrece una alternativa más conveniente para los casos de uso comunes. Es ideal para sistemas legados complejos, librerías sofisticadas o cualquier contexto donde se necesite una capa de simplificación que además promueva el bajo acoplamiento.

```javascript
class SistemaDePedidos {
  verificarDisponibilidad(producto) {
    console.log(`Verificando disponibilidad de ${producto}`);
    return true;
  }
  
  realizarPedido(producto, cantidad) {
    console.log(`Realizando pedido de ${cantidad} unidades de ${producto}`);
    return { idPedido: Math.floor(Math.random() * 1000) };
  }
}

class SistemaDePagos {
  procesarPago(monto, tarjeta) {
    console.log(`Procesando pago de $${monto} con tarjeta terminada en ${tarjeta.slice(-4)}`);
    return true;
  }
}

class SistemaDeEnvio {
  enviarPedido(idPedido, direccion) {
    console.log(`Enviando pedido ${idPedido} a ${direccion}`);
    return { numeroSeguimiento: `TRK${Math.floor(Math.random() * 10000)}` };
  }
}

// Fachada
class TiendaOnline {
  constructor() {
    this.pedidos = new SistemaDePedidos();
    this.pagos = new SistemaDePagos();
    this.envios = new SistemaDeEnvio();
  }
  
  comprarProducto(producto, cantidad, tarjeta, direccion) {
    if (!this.pedidos.verificarDisponibilidad(producto)) {
      throw new Error('Producto no disponible');
    }
    
    const { idPedido } = this.pedidos.realizarPedido(producto, cantidad);
    const monto = cantidad * 100; // Precio fijo de ejemplo
    
    if (!this.pagos.procesarPago(monto, tarjeta)) {
      throw new Error('Pago fallido');
    }
    
    const { numeroSeguimiento } = this.envios.enviarPedido(idPedido, direccion);
    
    return { idPedido, numeroSeguimiento, monto };
  }
}

// Uso
const tienda = new TiendaOnline();
const resultado = tienda.comprarProducto('iPhone 15', 1, '4111111111111111', 'Calle Falsa 123');

console.log('Compra exitosa:', resultado);
/*
Verificando disponibilidad de iPhone 15
Realizando pedido de 1 unidades de iPhone 15
Procesando pago de $100 con tarjeta terminada en 1111
Enviando pedido 123 a Calle Falsa 123
Compra exitosa: { idPedido: 123, numeroSeguimiento: "TRK1234", monto: 100 }
*/
```

## 5. Adapter Pattern (Patrón Adaptador)

El Adaptador permite que clases con interfaces incompatibles trabajen juntas, actuando como puente entre ellas. Su propósito principal es resolver problemas de integración donde no podemos modificar el código fuente existente, pero necesitamos que coopere con nuevos componentes. Transforma la interfaz de una clase en otra interfaz que el cliente espera, haciendo posible la colaboración entre clases que de otro modo no podrían hacerlo por diferencias en sus interfaces. Este patrón es esencial cuando se trabaja con librerías de terceros, sistemas heredados o cuando se introducen nuevas funcionalidades en sistemas existentes. A diferencia del Bridge (que se diseña desde el inicio), el Adapter surge como solución a un problema de incompatibilidad.

```javascript
// Sistema heredado (viejo)
class SistemaViejo {
  obtenerInfo() {
    return {
      nombreCompleto: 'Gómez, María',
      fechaNac: '15/03/1985',
      salarioBase: 50000
    };
  }
}

// Nuevo sistema que espera datos en otro formato
class SistemaNuevo {
  constructor(empleado) {
    this.empleado = empleado;
  }
  
  mostrarInformacion() {
    console.log(`Nombre: ${this.empleado.nombre}`);
    console.log(`Edad: ${this.empleado.edad} años`);
    console.log(`Salario: $${this.empleado.salario}`);
  }
}

// Adaptador
class AdaptadorEmpleado {
  constructor(sistemaViejo) {
    this.sistemaViejo = sistemaViejo;
  }
  
  get empleado() {
    const viejo = this.sistemaViejo.obtenerInfo();
    
    // Convertir formato
    const nombreParts = viejo.nombreCompleto.split(', ');
    const nombre = `${nombreParts[1]} ${nombreParts[0]}`;
    
    const fechaNacParts = viejo.fechaNac.split('/');
    const añoNac = parseInt(fechaNacParts[2]);
    const añoActual = new Date().getFullYear();
    const edad = añoActual - añoNac;
    
    return {
      nombre,
      edad,
      salario: viejo.salarioBase * 1.1 // Ajuste de salario
    };
  }
}

// Uso
const sistemaViejo = new SistemaViejo();
const adaptador = new AdaptadorEmpleado(sistemaViejo);
const sistemaNuevo = new SistemaNuevo(adaptador.empleado);

sistemaNuevo.mostrarInformacion();
/*
Nombre: María Gómez
Edad: 38 años
Salario: $55000
*/
```

## 6. Decorator Pattern (Patrón Decorador)

El Decorador permite añadir responsabilidades adicionales a un objeto de manera dinámica y flexible, sin usar subclases. Su propósito es extender funcionalidad de forma modular, evitando la explosión de clases que ocurriría si usáramos solo herencia. Los decoradores envuelven el objeto original, proporcionando la misma interfaz pero añadiendo comportamiento antes o después de delegar al objeto envuelto. Este patrón es ideal cuando necesitas extender objetos individuales (no toda la clase) y cuando quieres mantener la capacidad de combinar comportamientos de múltiples decoradores. Es ampliamente usado en sistemas de streaming, procesamiento de datos y UI, donde las combinaciones de características son numerosas.

```javascript
class Cafe {
  costo() {
    return 5;
  }
  
  descripcion() {
    return 'Café simple';
  }
}

// Decorador base
class DecoradorCafe {
  constructor(cafe) {
    this.cafe = cafe;
  }
  
  costo() {
    return this.cafe.costo();
  }
  
  descripcion() {
    return this.cafe.descripcion();
  }
}

// Decoradores concretos
class Leche extends DecoradorCafe {
  costo() {
    return this.cafe.costo() + 2;
  }
  
  descripcion() {
    return `${this.cafe.descripcion()}, con leche`;
  }
}

class Chocolate extends DecoradorCafe {
  costo() {
    return this.cafe.costo() + 3;
  }
  
  descripcion() {
    return `${this.cafe.descripcion()}, con chocolate`;
  }
}

class Crema extends DecoradorCafe {
  costo() {
    return this.cafe.costo() + 1.5;
  }
  
  descripcion() {
    return `${this.cafe.descripcion()}, con crema`;
  }
}

// Uso
let miCafe = new Cafe();
console.log(`${miCafe.descripcion()}: $${miCafe.costo()}`); // Café simple: $5

miCafe = new Leche(miCafe);
console.log(`${miCafe.descripcion()}: $${miCafe.costo()}`); // Café simple, con leche: $7

miCafe = new Chocolate(miCafe);
console.log(`${miCafe.descripcion()}: $${miCafe.costo()}`); // Café simple, con leche, con chocolate: $10

miCafe = new Crema(miCafe);
console.log(`${miCafe.descripcion()}: $${miCafe.costo()}`); // Café simple, con leche, con chocolate, con crema: $11.5
```

## 7. Flyweight Pattern (Patrón Peso Ligero)

El Flyweight optimiza el uso de memoria compartiendo eficientemente partes del estado entre múltiples objetos. Su propósito es manejar grandes cantidades de objetos de grano fino cuando la representación completa usaría demasiados recursos. Divide el estado en intrínseco (compartido) y extrínseco (específico de cada objeto), almacenando solo el estado intrínseco una vez y pasando el extrínseco cuando se necesita. Este patrón es crucial en aplicaciones que manejan millones de objetos similares (como editores de texto, videojuegos o visualización de datos). El trade-off es mayor complejidad en el código a cambio de ahorros significativos en memoria y tiempo de creación de objetos.

```javascript
class ArbolFlyweight {
  constructor(tipo, color, textura) {
    this.tipo = tipo;
    this.color = color;
    this.textura = textura;
  }
  
  dibujar(x, y) {
    console.log(`Dibujando árbol de tipo ${this.tipo} (${this.color}, ${this.textura}) en posición (${x}, ${y})`);
  }
}

class FabricaDeArboles {
  constructor() {
    this.arboles = {};
  }
  
  obtenerArbol(tipo, color, textura) {
    const clave = `${tipo}_${color}_${textura}`;
    
    if (!this.arboles[clave]) {
      this.arboles[clave] = new ArbolFlyweight(tipo, color, textura);
      console.log(`Creando nuevo árbol flyweight: ${clave}`);
    }
    
    return this.arboles[clave];
  }
}

class Bosque {
  constructor() {
    this.fabrica = new FabricaDeArboles();
    this.arboles = [];
  }
  
  plantarArbol(x, y, tipo, color, textura) {
    const flyweight = this.fabrica.obtenerArbol(tipo, color, textura);
    this.arboles.push({ flyweight, x, y });
  }
  
  dibujarBosque() {
    this.arboles.forEach(arbol => {
      arbol.flyweight.dibujar(arbol.x, arbol.y);
    });
  }
}

// Uso
const bosque = new Bosque();

// Plantar 1000 árboles, pero solo crear 2 flyweights
for (let i = 0; i < 500; i++) {
  bosque.plantarArbol(Math.random() * 100, Math.random() * 100, 'Pino', 'Verde', 'Rugoso');
  bosque.plantarArbol(Math.random() * 100, Math.random() * 100, 'Roble', 'Marrón', 'Liso');
}

bosque.dibujarBosque();
/*
Creando nuevo árbol flyweight: Pino_Verde_Rugoso
Creando nuevo árbol flyweight: Roble_Marrón_Liso
Dibujando árbol de tipo Pino (Verde, Rugoso) en posición (x, y)
Dibujando árbol de tipo Roble (Marrón, Liso) en posición (x, y)
... (998 veces más)
*/
```

## 8. Proxy Pattern (Patrón Proxy)

El Proxy controla el acceso a un objeto, actuando como sustituto o intermediario. Su propósito principal es proporcionar un nivel de indirección para operaciones como: control de acceso, caching, inicialización perezosa o logging, sin modificar el objeto original. Existen varios tipos de proxies (virtual, remoto, de protección, etc.), cada uno especializado en un tipo de control de acceso. Este patrón es esencial en sistemas distribuidos (para objetos remotos), en aplicaciones que requieren control granular de permisos o cuando operaciones son costosas y necesitan optimización. El proxy mantiene la misma interfaz que el objeto real, haciendo transparente su uso para el cliente.

```javascript
class BancoReal {
  constructor() {
    this.saldo = 1000;
  }
  
  depositar(cantidad) {
    this.saldo += cantidad;
    console.log(`Depositado $${cantidad}. Saldo actual: $${this.saldo}`);
  }
  
  retirar(cantidad) {
    if (cantidad > this.saldo) {
      throw new Error('Fondos insuficientes');
    }
    this.saldo -= cantidad;
    console.log(`Retirado $${cantidad}. Saldo actual: $${this.saldo}`);
  }
  
  verSaldo() {
    console.log(`Saldo actual: $${this.saldo}`);
    return this.saldo;
  }
}

class ProxyBanco {
  constructor(usuario) {
    this.bancoReal = new BancoReal();
    this.usuario = usuario;
  }
  
  depositar(cantidad) {
    if (this.usuario.tienePermiso('depositar')) {
      this.bancoReal.depositar(cantidad);
    } else {
      console.log('Acceso denegado: No tienes permiso para depositar');
    }
  }
  
  retirar(cantidad) {
    if (this.usuario.tienePermiso('retirar')) {
      try {
        this.bancoReal.retirar(cantidad);
      } catch (error) {
        console.log(`Error al retirar: ${error.message}`);
      }
    } else {
      console.log('Acceso denegado: No tienes permiso para retirar');
    }
  }
  
  verSaldo() {
    if (this.usuario.tienePermiso('consultar')) {
      return this.bancoReal.verSaldo();
    } else {
      console.log('Acceso denegado: No tienes permiso para consultar saldo');
      return null;
    }
  }
}

class Usuario {
  constructor(nombre, permisos) {
    this.nombre = nombre;
    this.permisos = permisos;
  }
  
  tienePermiso(permiso) {
    return this.permisos.includes(permiso);
  }
}

// Uso
const usuarioBasico = new Usuario('Juan', ['consultar']);
const usuarioPremium = new Usuario('Ana', ['depositar', 'retirar', 'consultar']);

const cuentaBasica = new ProxyBanco(usuarioBasico);
const cuentaPremium = new ProxyBanco(usuarioPremium);

cuentaBasica.verSaldo(); // Saldo actual: $1000
cuentaBasica.depositar(500); // Acceso denegado: No tienes permiso para depositar
cuentaBasica.retirar(200); // Acceso denegado: No tienes permiso para retirar

cuentaPremium.depositar(500); // Depositado $500. Saldo actual: $1500
cuentaPremium.retirar(200); // Retirado $200. Saldo actual: $1300
cuentaPremium.verSaldo(); // Saldo actual: $1300
```

## 9. Observer Pattern (Patrón Observador)

El Observer define una relación de dependencia uno-a-muchos donde cambios en un objeto (sujeto) notifican automáticamente a sus dependientes (observadores). Su propósito es crear un mecanismo de propagación de eventos eficiente y desacoplado, donde los observadores pueden suscribirse o desuscribirse dinámicamente. Este patrón es fundamental en arquitecturas basadas en eventos, implementación de MVC (para actualizar vistas cuando cambia el modelo) y en cualquier sistema donde componentes deben reaccionar a cambios de estado sin polling. Promueve el bajo acoplamiento al evitar que el sujeto conozca detalles concretos de sus observadores, comunicándose solo a través de una interfaz abstracta.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  suscribir(observer) {
    this.observers.push(observer);
  }
  
  desuscribir(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notificar(data) {
    this.observers.forEach(observer => observer.actualizar(data));
  }
}

class Observer {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  actualizar(data) {
    console.log(`${this.nombre} recibió notificación: ${data}`);
  }
}

// Ejemplo concreto: Sistema de noticias
class PublicadorNoticias extends Subject {
  publicarNoticia(titulo, contenido) {
    const noticia = `[${titulo}] ${contenido}`;
    console.log(`Publicando noticia: ${noticia}`);
    this.notificar(noticia);
  }
}

// Uso
const elPais = new PublicadorNoticias();

const suscriptor1 = new Observer('Juan');
const suscriptor2 = new Observer('María');
const suscriptor3 = new Observer('Carlos');

elPais.suscribir(suscriptor1);
elPais.suscribir(suscriptor2);

elPais.publicarNoticia('Nueva ley fiscal', 'Se aprueba nueva ley fiscal que afectará a las rentas altas');
/*
Publicando noticia: [Nueva ley fiscal] Se aprueba nueva ley fiscal que afectará a las rentas altas
Juan recibió notificación: [Nueva ley fiscal] Se aprueba nueva ley fiscal que afectará a las rentas altas
María recibió notificación: [Nueva ley fiscal] Se aprueba nueva ley fiscal que afectará a las rentas altas
*/

elPais.desuscribir(suscriptor1);
elPais.suscribir(suscriptor3);

elPais.publicarNoticia('Avance científico', 'Descubren nueva terapia contra el cáncer');
/*
Publicando noticia: [Avance científico] Descubren nueva terapia contra el cáncer
María recibió notificación: [Avance científico] Descubren nueva terapia contra el cáncer
Carlos recibió notificación: [Avance científico] Descubren nueva terapia contra el cáncer
*/
```

## 10. Command Pattern (Patrón Comando)

El Command encapsula una solicitud como un objeto, permitiendo parametrizar clientes con operaciones diferentes. Su propósito es desacoplar el objeto que invoca una operación del objeto que sabe cómo ejecutarla, permitiendo colas, logs y operaciones reversibles. Al convertir solicitudes en objetos independientes, este patrón facilita características como: deshacer/rehacer, macros (secuencias de comandos) y operaciones diferidas. Es especialmente útil en interfaces de usuario (para manejar acciones del menú), sistemas transaccionales y operaciones remotas. El patrón también simplifica la adición de nuevos comandos sin modificar el código existente, siguiendo el principio Open/Closed.

```javascript
class Luz {
  encender() {
    console.log('Luz encendida');
    this.estado = 'encendida';
  }
  
  apagar() {
    console.log('Luz apagada');
    this.estado = 'apagada';
  }
}

// Comando base
class Comando {
  ejecutar() {}
  deshacer() {}
}

// Comandos concretos
class ComandoEncenderLuz extends Comando {
  constructor(luz) {
    super();
    this.luz = luz;
  }
  
  ejecutar() {
    this.estadoPrevio = this.luz.estado;
    this.luz.encender();
  }
  
  deshacer() {
    if (this.estadoPrevio === 'apagada') {
      this.luz.apagar();
    }
  }
}

class ComandoApagarLuz extends Comando {
  constructor(luz) {
    super();
    this.luz = luz;
  }
  
  ejecutar() {
    this.estadoPrevio = this.luz.estado;
    this.luz.apagar();
  }
  
  deshacer() {
    if (this.estadoPrevio === 'encendida') {
      this.luz.encender();
    }
  }
}

// Invocador
class ControlRemoto {
  constructor() {
    this.comandos = {};
    this.historial = [];
  }
  
  configurarComando(nombre, comando) {
    this.comandos[nombre] = comando;
  }
  
  presionarBoton(nombre) {
    if (this.comandos[nombre]) {
      this.comandos[nombre].ejecutar();
      this.historial.push(this.comandos[nombre]);
    }
  }
  
  deshacer() {
    const comando = this.historial.pop();
    if (comando) {
      comando.deshacer();
    }
  }
}

// Uso
const luzSala = new Luz();
const control = new ControlRemoto();

control.configurarComando('encender', new ComandoEncenderLuz(luzSala));
control.configurarComando('apagar', new ComandoApagarLuz(luzSala));

control.presionarBoton('encender'); // Luz encendida
control.presionarBoton('apagar');   // Luz apagada

console.log('--- Deshaciendo ---');
control.deshacer(); // Luz encendida (deshace el apagar)
control.deshacer(); // Luz apagada (deshace el encender)
```

## 11. Chain of Responsibility Pattern (Patrón Cadena de Responsabilidad)

Este patrón permite que múltiples objetos tengan la oportunidad de procesar una solicitud, evitando acoplar el emisor al receptor específico. Su propósito es crear una cadena de manejadores donde cada uno decide si procesa la solicitud o la pasa al siguiente en la cadena. Es ideal para sistemas con múltiples procesadores potenciales para un evento (como sistemas de logging, filtros de eventos o pipelines de procesamiento). La cadena puede configurarse dinámicamente, ofreciendo flexibilidad en cómo se manejan las solicitudes. Este patrón promueve el desacoplamiento al permitir que los manejadores sean independientes entre sí y que el cliente no necesite conocer la estructura exacta de la cadena.

```javascript
class Manejador {
  constructor() {
    this.siguiente = null;
  }
  
  establecerSiguiente(manejador) {
    this.siguiente = manejador;
    return manejador;
  }
  
  manejar(solicitud) {
    if (this.siguiente) {
      return this.siguiente.manejar(solicitud);
    }
    return `Nadie pudo manejar la solicitud: ${solicitud}`;
  }
}

class ManejadorPositivo extends Manejador {
  manejar(solicitud) {
    if (solicitud > 0) {
      return `ManejadorPositivo: Manejo la solicitud ${solicitud}`;
    }
    return super.manejar(solicitud);
  }
}

class ManejadorNegativo extends Manejador {
  manejar(solicitud) {
    if (solicitud < 0) {
      return `ManejadorNegativo: Manejo la solicitud ${solicitud}`;
    }
    return super.manejar(solicitud);
  }
}

class ManejadorCero extends Manejador {
  manejar(solicitud) {
    if (solicitud === 0) {
      return `ManejadorCero: Manejo la solicitud ${solicitud}`;
    }
    return super.manejar(solicitud);
  }
}

// Uso
const manejadorPositivo = new ManejadorPositivo();
const manejadorNegativo = new ManejadorNegativo();
const manejadorCero = new ManejadorCero();

// Configurar cadena
manejadorPositivo
  .establecerSiguiente(manejadorNegativo)
  .establecerSiguiente(manejadorCero);

function cliente(manejador, solicitudes) {
  for (const solicitud of solicitudes) {
    console.log(`Solicitud: ${solicitud}`);
    const resultado = manejador.manejar(solicitud);
    console.log(`  ${resultado}`);
  }
}

const solicitudes = [5, -3, 0, 10, -7, 0, 'abc'];
cliente(manejadorPositivo, solicitudes);

/*
Solicitud: 5
  ManejadorPositivo: Manejo la solicitud 5
Solicitud: -3
  ManejadorNegativo: Manejo la solicitud -3
Solicitud: 0
  ManejadorCero: Manejo la solicitud 0
Solicitud: 10
  ManejadorPositivo: Manejo la solicitud 10
Solicitud: -7
  ManejadorNegativo: Manejo la solicitud -7
Solicitud: 0
  ManejadorCero: Manejo la solicitud 0
Solicitud: abc
  Nadie pudo manejar la solicitud: abc
*/
```

Cada patrón de diseño resuelve un problema específico en el desarrollo de software. La elección del patrón adecuado depende del contexto y del problema que estés tratando de resolver. Estos ejemplos en JavaScript muestran cómo implementar cada patrón en un lenguaje moderno y flexible como JavaScript.