# Python Notes/Cheat Sheet - Traducción al Español

## Comentarios
```python
# Desde el símbolo de hash hasta el final de la línea
```

## Bloques de código
Se delimitan por dos puntos y código indentado, no con llaves como en C, C++ o Java.

```python
def es_pez_como_cadena(argumento):
    if argumento:
        return 'pez'
    else:
        return 'no es pez'
```

**Nota**: Cuatro espacios por nivel de indentación es el estándar en Python. Nunca uses tabulaciones: mezclar tabs y espacios produce errores difíciles de encontrar. Configura tu editor para convertir tabs a espacios.

## Saltos de línea
Normalmente, una declaración debe estar en una línea. Código entre paréntesis - (), [] o {} - puede dividirse en múltiples líneas. También puedes usar una barra invertida \ al final de una línea para continuar una declaración en la siguiente línea (pero esto puede resultar en código difícil de depurar).

## Convenciones de nombres
| Estilo | Uso |
|--------|-----|
| EstiloCamelCase | Nombres de clases |
| minusculas_unidas | Identificadores, funciones, métodos y atributos de clase |
| _minusculas_unidas | Atributos internos de clase |
| __minusculas_unidas | Atributos privados de clase (no recomendado) |
| MAYUSCULAS_UNIDAS | Constantes |

## Tipos básicos de objetos (lista incompleta)
| Tipo | Ejemplos |
|------|----------|
| None | None # objeto nulo singleton |
| Boolean | True, False |
| Entero | -1, 0, 1, sys.maxint |
| Long | 1L, 9787L # enteros de longitud arbitraria |
| Float | 3.14159265, inf, float('inf') # infinito, -inf # infinito negativo, nan, float('nan') # no es un número |
| Complejo | 2+3j # nota el uso de j |
| String | 'Soy un string', "yo también", "string multi\nlinea", """+1""", r'raw string', b'ASCII string', u'unicode string' |
| Tupla | vacia = () # tupla vacía, (1, True, 'perro') # lista inmutable |
| Lista | vacia = [] # lista vacía, [1, True, 'perro'] # lista mutable |
| Conjunto | vacio = set() # conjunto vacío, set(1, True, 'a') # mutable |
| Diccionario | vacio = {} # objeto mutable, {'a': 'perro', 7: 'siete', True: 1} |
| Archivo | f = open('nombre_archivo', 'rb') |

**Nota**: Python tiene cuatro tipos numéricos (entero, float, long y complejo) y varios tipos de secuencias incluyendo strings, listas, tuplas, bytearrays, buffers y objetos range.

## Operadores
| Operador | Funcionalidad |
|----------|---------------|
| + | Suma (también concatenación de strings, tuplas, listas y otras secuencias) |
| - | Resta (también diferencia de conjuntos) |
| * | Multiplicación (también replicación de strings, tuplas, listas) |
| / | División |
| % | Módulo (también función de formato de strings, pero este uso está obsoleto) |
| // | División entera redondeada hacia menos infinito |
| ** | Exponenciación |
| =, -=, +=, /=, *=, %=, //=, **= | Operadores de asignación |
| ==, !=, <, <=, >=, > | Comparaciones booleanas |
| and, or, not | Operadores booleanos |
| in, not in | Operadores de prueba de contención |
| is, is not | Operadores de identidad de objetos |
| \|, ^, &, ~ | Operadores bit a bit: or, xor, and, complemento |
| <<, >> | Desplazamiento bit a bit izquierdo y derecho |
| ; | Separador de declaraciones en línea (no recomendado) |

**Consejo**: float('inf') siempre se evalúa como mayor que cualquier número, incluyendo enteros.

## Módulos
Los módulos abren un mundo de extensiones de Python que pueden importarse y usarse. El acceso a funciones, variables y clases de un módulo depende de cómo se importó el módulo.

| Método de importación | Sintaxis de acceso/uso |
|-----------------------|------------------------|
| import math | math.cos(math.pi/3) |
| import math as m | m.cos(m.pi/3) # importar usando un alias |
| from math import cos, pi | cos(pi/3) # solo importar elementos específicos |
| from math import * | log(e) # importación global NO recomendada |

**Advertencia**: Las importaciones globales hacen que el código sea ilegible!!!

## Módulos comunes
| Módulo | Propósito |
|--------|-----------|
| datetime | Funciones de fecha y hora |
| time |  |
| math | Funciones matemáticas básicas y las constantes pi y e |
| pickle | Serializar objetos a un archivo |
| os | Interfaces del sistema operativo |
| os.path |  |
| re | Operaciones de expresiones regulares al estilo Perl |
| string | Constantes y clases útiles |
| sys | Parámetros y funciones del sistema |
| numpy | Biblioteca numérica de Python |
| pandas | DataFrames de R para Python |
| matplotlib | Gráficos para Python |

## If - Control de flujo
```python
if condicion:  # por ejemplo: if x < 5:
    declaraciones
elif condicion:  # opcional - puede haber múltiples
    declaraciones
else:  # opcional
    declaraciones
```

## For - Control de flujo
```python
for x in iterable:
    declaraciones
else:  # código opcional de finalización
    declaraciones
```

## While - Control de flujo
```python
while condicion:
    declaraciones
else:  # código opcional de finalización
    declaraciones
```

## Expresión ternaria
```python
id = expresion if condicion else expresion
x = y if a > b else z - 5
```

Algunos adjuntos útiles:
- `pass` - una declaración que no hace nada
- `continue` - pasa a la siguiente iteración del ciclo
- `break` - para salir de los ciclos for y while

**Trampa**: break omite el código else de finalización

## Excepciones - Control de flujo
```python
try:
    declaraciones
except (tupla_de_errores):  # puede ser múltiple
    declaraciones
else:  # opcional cuando no hay excepciones
    declaraciones
finally:  # opcional en todos los casos
    declaraciones
```

## Excepciones comunes (lista incompleta)
| Excepción | Razón |
|-----------|-------|
| AssertionError | Falló la declaración assert |
| AttributeError | Falló la asignación o referencia a un atributo de clase |
| IOError | Falló una operación de I/O |
| ImportError | Falló la importación de un módulo |
| IndexError | Subíndice fuera de rango |
| KeyError | Clave de diccionario no encontrada |
| MemoryError | Se acabó la memoria |
| NameError | Nombre no encontrado |
| TypeError | Valor de tipo incorrecto |
| ValueError | Tipo correcto pero valor incorrecto |

## Levantar errores
Los errores se levantan usando la declaración raise
```python
raise ValueError(valor)
```

## Crear nuevos errores
```python
class MiError(Exception):
    def __init__(self, valor):
        self.valor = valor
    def __str__(self):
        return repr(self.valor)
```

## Objetos y variables (también llamados identificadores)
- Todo es un objeto en Python (en el sentido de que puede asignarse a una variable o pasarse como argumento a una función)
- La mayoría de los objetos Python tienen métodos y atributos
- Todas las variables son esencialmente "punteros", no "ubicaciones". Son referencias a objetos
- Los objetos tienen tipos fuertes, no los identificadores
- Algunos objetos son inmutables (int, float, string, tuple, frozenset). Pero la mayoría son mutables (incluyendo: list, set, dictionary, arrays NumPy, etc.)
- Puedes crear tus propios tipos de objetos definiendo una nueva clase

## Booleanos y "truthiness"
La mayoría de los objetos Python tienen una noción de "verdad".

| Falso | Verdadero |
|-------|-----------|
| None |  |
| 0 | Cualquier número distinto de 0 |
| int(False) # → 0 | int(True) # → 1 |
| "" | 'fred', 'False' # string vacío | todos los demás strings |
| () [] {} set() | [None], (False), {1, 1} # contenedores vacíos | contenedores no vacíos, incluso aquellos que contienen False o None |

Puedes usar bool() para descubrir el estado de verdad de un objeto.
```python
a = bool(obj)  # la verdad de obj
```

Es "pythonico" usar la verdad de los objetos.
```python
if contenedor:  # prueba si no está vacío
    # hacer algo
while items:  # idiom común de ciclo
    item = items.pop()
    # procesar item
```

Especifica la verdad de las clases que escribas usando el método mágico `__nonzero__()`.

## Comparaciones
Python te permite comparar rangos, por ejemplo:
```python
assert(1 <= x <= 100)
```

## Tuplas
Las tuplas son listas inmutables. Pueden buscarse, indexarse e iterarse como listas.
```python
a = ()  # tupla vacía
a = (1,)  # < nota la coma # tupla de un elemento
a = (1, 2, 3)  # tupla de múltiples elementos
a = ((1, 2), (3, 4))  # tupla anidada
a = tuple(['a', 'b'])  # conversión
```

**Nota**: La coma es el constructor de tupla, no los paréntesis. Los paréntesis añaden claridad.

El idiom Python para intercambiar variables:
```python
a, b = b, a  # no se necesita una variable temporal
```
Esta sintaxis usa tuplas para lograr su magia.

## Strings (inmutables, ordenados, caracteres)
```python
s = 'string'.upper()  # STRING
s = 'fred'+'fue'+'aquí'  # concatenación
s = ''.join(['fred', 'fue', 'aquí'])  # lo mismo
s = 'span' * 3  # replicación
s = str(x)  # conversión
```

## Iteración de strings y búsqueda de substrings
```python
for caracter in 'str':  # iteración
    print(ord(caracter))  # 115 116 114
for indice, caracter in enumerate('str'):
    print(indice, caracter)
if 'rojo' in 'Fred':  # búsqueda
    print('Fred es rojo')  # se imprime!
```

## Métodos de strings (lista incompleta)
capitalize, center, count, decode, encode, endswith, expandtabs, find, format, index, isalnum, isalpha, isdigit, islower, issuance, istitle, isupper, join, ljust, lower, lstrip, partition, replace, rfind, rindex, rjust, partition, rsplit, rstrip, split, splittines, startswith, strip, swapcase, title, translate, upper, zfill

## Constantes de strings (lista incompleta)
```python
from string import *  # importación global no es buena
print([digits, hexdigits, ascii_letters, ascii_lowercase, ascii_uppercase, punctuation])
```

## Formateo de strings al viejo estilo (usando operador %)
```python
print("Ocurrió %d %%s" % (5, 'veces'))  # imprime: 'Ocurrió 5 veces'
```

| Código | Significado |
|--------|-------------|
| s | String o conversión a string |
| c | Carácter |
| d | Entero decimal con signo |
| u | Entero decimal sin signo |
| H o h | Entero hexadecimal (mayúsculas o minúsculas) |
| f | Punto flotante |
| E o e | Exponente (E mayúscula o minúscula) |
| G o g | El más corto entre e y f (mayúscula/minúscula) |
| % | Literal % |

```python
import math
'%s' % math.pi  # '3.14159265359'
'%f' % math.pi  # '3.141593'
'%.2f' % math.pi  # '3.14'
'%.2e' % 3000  # '3.00e+03'
'%03d' % 5  # '005'
```

## Nuevo formateo de strings (usando método format)
Usa: 'template-string'.format(arguments)

Ejemplos (usando códigos similares a los anteriores):

```python
import math
'Hola {}'.format('Mundo')  # 'Hola Mundo'
'{}'.format(math.pi)  # '3.14159265359'
'{0:.2f}'.format(math.pi)  # '3.14'
'{0:+4.2f}'.format(5)  # '+5.00'
'{:.2e}'.format(3000)  # '3.00e+03'
'{:02d}'.format(5)  # '05' (relleno izquierdo)
'{:2d}'.format(5)  # ' 5' (relleno derecho)
'{:,}'.format(1000000)  # '1,000,000'
'{:.1%}'.format(0.25)  # '25.0%'
'{0}{1}'.format('a', 'b')  # 'ab'
'{1}{0}'.format('a', 'b')  # 'ba'
'{num}'.format(num=7)  # '7' (argumentos nombrados)
```

## Listas (contenedor mutable, indexado, ordenado)
Indexadas desde cero hasta longitud-1

```python
a = []  # lista vacía
a = ['perro', 'gato', 'pájaro']  # lista simple
a = [[1, 2], ['a', 'b']]  # listas anidadas
a = [1, 2, 3] + [4, 5, 6]  # concatenación
a = [1, 2, 3] * 3  # replicación
a = list(x)  # conversión
```

## Comprensiones de listas (pueden anidarse)
Comprensiones: una forma compacta de crear listas

```python
t3 = [x*3 for x in [5, 6, 7]]  # [15, 18, 21]
z = [complex(x, y) for x in range(0, 4, 1)
     for y in range(4, 0, -1) if x > y]
# z --> [(2+1j), (3+2j), (3+1j)]
```

## Iterando listas
```python
L = ['perro', 'gato', 'tortuga']
for item in L:
    print(item)
for indice, item in enumerate(L):
    print(indice, item)
```

## Buscando en listas
```python
L = ['perro', 'gato', 'tortuga']
valor = 'gato'
if valor in L:
    cuenta = L.count(valor)
    primera_ocurrencia = L.index(valor)
if valor not in L:
    print('la lista no tiene {}'.format(valor))
```

## Métodos de listas (lista incompleta)
| Método | Qué hace |
|--------|----------|
| L.append(x) | Añade x al final de la lista |
| L.extend(otra) | Añade items de otra lista |
| L.insert(pos, x) | Inserta x en posición |
| del L[pos] | Borra item en posición |
| L.remove(x) | Elimina primera ocurrencia de x; Error si no hay x |
| L.pop([pos]) | Elimina último item de la lista (o item en pos); Error si lista vacía |
| L.index(x) | Obtiene índice de primera ocurrencia de x; Error si x no encontrado |
| L.count(x) | Cuenta número de veces que x aparece en la lista |
| L.sort() | Ordena lista in situ |
| L.reverse(x) | Invierte lista in situ |

## Rebanado de listas
```python
x = [0, 1, 2, 3, 4, 5, 6, 7, 8] # datos de ejemplo
x[2]  # 3er elemento - referencia no rebanado
x[1:3]  # 2do a 3er elemento (1, 2)
x[:3]  # primeros tres elementos (0, 1, 2)
x[-3:]  # últimos tres elementos
x[:-3]  # todos menos los últimos tres elementos
x[:]  # cada elemento de x - copia x
x[1:-1]  # todos menos primer y último elemento
x[::3]  # (0, 3, 6, 9,...) 1ro luego cada 3ro
x[1:5:2]  # (1,3) empezar en 1, parar >=5, cada 2do
```

**Nota**: Todos los tipos de secuencia Python soportan el rebanado por índices (strings, listas, tuplas, bytearrays, buffers y objetos range).

## Conjuntos (contenedor único, no ordenado)
Un conjunto Python es una colección mutable, no ordenada de objetos hashables únicos.

```python
a = set()  # conjunto vacío
a = {'rojo', 'blanco', 'azul'}  # conjunto simple
a = set(x)  # convertir lista
```

**Trampa**: {} crea un diccionario vacío, no un conjunto vacío

## Comprensiones de conjuntos
```python
# un conjunto de letras seleccionadas...
s = {e for e in 'ABCDABC' if e not in 'AB'}
# --> {'H', 'C', 'J', 'D'}
# un conjunto de tuplas...
s = {(x,y) for x in range(-1,2)
     for y in range(-1,2)}
```

**Trampa**: Los contenidos del conjunto deben ser inmutables para ser hashables. Puedes tener un conjunto de tuplas, pero no un conjunto de listas.

## Iterando un conjunto
```python
for item in conjunto:
    print(item)
```

## Buscando en un conjunto
```python
if item in conjunto:
    print(item)
if item not in conjunto:
    print('{} no está'.format(item))
```

## Métodos de conjuntos (lista incompleta)
| Método | Qué hace |
|--------|----------|
| len(s) | Número de items en conjunto |
| s.add(item) | Añade item al conjunto |
| s.remove(item) | Elimina item del conjunto. Lanza KeyError si no se encuentra. |
| s.discard(item) | Elimina item del conjunto si está presente. |
| s.pop() | Elimina y devuelve un item arbitrario. Lanza KeyError si conjunto vacío. |
| s.clear() | Elimina todos los items del conjunto |
| item in s | Verdadero o Falso |
| item not in s | Verdadero o Falso |
| iter(s) | Iterador sobre los items del conjunto (orden arbitrario) |
| s.copy() | Obtiene copia superficial del conjunto |
| s.isdisjoint(o) | Verdadero si s no tiene items en común con otro conjunto o |
| s.issubset(o) | Igual que set <= other |
| s.issuperset(o) | Igual que set >= other |
| s.union(o[, ...]) | Devuelve nuevo conjunto unión |
| s.intersection(o) | Devuelve nueva intersección |
| s.difference(o) | Obtiene nuevo conjunto de items en s pero no en otros (igual que set - other) |

## Frozenset
Similar a un conjunto Python, pero inmutable (y por lo tanto hashable).

```python
f = frozenset(s)  # convertir conjunto
f = frozenset(o)  # convertir otro
```

## Diccionarios (contenedor mapa indexado, no ordenado)
Un mapa hash mutable de pares clave=valor únicos.

```python
a = {}  # diccionario vacío
a = {1: 1, 2: 4, 3: 9}  # diccionario simple
a = dict(x)  # convertir datos emparejados
# siguiente ejemplo - crear desde una lista
l = ['alpha', 'beta', 'gamma', 'delta']
a = dict(zip(range(len(l)), l))
# Ejemplo usando string & expresión generadora
s = 'a=manzana,b=pájaro,c=gato,d=perro,e=huevo'
a = dict(i.split("=") for i in s.split(","))
# {'a': 'manzana', 'c': 'gato', 'b': 'pájaro', 'e': 'huevo', 'd': 'perro'}
```

## Comprensiones de diccionarios
Conceptualmente como comprensiones de listas; pero construye un diccionario en lugar de una lista.

```python
a = {n: n*n for n in range(7)}
# a -> {0:0, 1:1, 2:4, 3:9, 4:16, 5:25,6:36}
impares_cuad = {n: n*n for n in range(7) if n%2}
# impares_cuad -> {1: 1, 3: 9, 5: 25}
# siguiente ejemplo -> intercambia pares clave:valor
a = {val:key for key, val in a.items()}
# siguiente ejemplo -> cuenta ocurrencias en lista
l = [11,12,13,11,15,19,15,11,20,13,11,11,12,10]
c = {key: l.count(key) for key in set(l)}
```

## Iterando un diccionario
```python
for clave in diccionario.keys():
    print(clave)
for clave, valor in diccionario.items():
    print(clave, valor)
for valor in diccionario.values():
    print(valor)
```

## Buscando en un diccionario
```python
if clave in diccionario:
    print(clave)
```

## Fusionando dos diccionarios
```python
fusionado = dict_1.copy()
fusionado.update(dict_2)
```

## Métodos de diccionarios (lista incompleta)
| Método | Qué hace |
|--------|----------|
| len(d) | Número de items en d |
| d[clave] | Obtiene valor para clave o lanza excepción KeyError |
| d[clave] = valor | Asigna clave a valor |
| del d[clave] | Eliminación |
| clave in d | Verdadero o Falso |
| clave not in d | Verdadero o Falso |
| iter(d) | Iterador sobre las claves |
| d.clear() | Elimina todos los items de d |
| d.copy() | Copia superficial del diccionario |
| d.get(clave[, def]) | Obtiene valor o devuelve default |
| d.items() | Pares (k,v) del diccionario |
| d.keys() | Claves del diccionario |
| d.pop(clave[, def]) | Obtiene valor o default; elimina clave del diccionario |
| d.popitem() | Elimina y devuelve un par (k, v) arbitrario |
| d.setdefault(k[, def])) | Si k en dict devuelve su valor, sino establece def |
| d.update(otro_d) | Actualiza d con pares clave:valor de otro |
| d.values() | Valores del diccionario |

## Funciones clave (lista incompleta)
| Función | Qué hace |
|---------|----------|
| abs(num) | Valor absoluto de num |
| all(iterable) | Verdadero si todos son Verdadero |
| any(iterable) | Verdadero si alguno es Verdadero |
| bytearray(fuente) | Un array mutable de bytes |
| callable(obj) | Verdadero si obj es llamable |
| chr(int) | Carácter para ASCII int |
| complex(real, imag) | Crea un número complejo |
| divmod(a, b) | Obtiene (cociente, residuo) |
| enumerate(seq) | Obtiene objeto enumerate, con método next() que devuelve tupla (índice, elemento) |
| eval(string) | Evalúa una expresión |
| filter(fn, iter) | Construye lista de elementos de iter para los que fn() devuelve Verdadero |
| float(x) | Convierte desde int/string |
| getattr(obj, str) | Como obj.str |
| hasattr(obj, str) | Verdadero si obj tiene atributo |
| hex(x) | Desde int a string hex |
| id(obj) | Devuelve identificador único (en tiempo de ejecución) para un objeto |
| int(x) | Convierte desde float/string |
| isinstance(o, c) | Ej. isinstance(2.1, float) |
| len(x) | Número de items en x; x es string, tupla, lista, dict |
| list(iterable) | Crea una lista |
| long(x) | Convierte string o número a entero largo |
| map(fn, iterable) | Aplica fn() a cada item en iterable; devuelve resultados en lista |
| max(a,b) | Lo que dice en la lata |
| max(iterable) |  |
| min(a,b) | Lo mismo |
| min(iterable) |  |
| next(iterador) | Obtiene siguiente item de un iter |
| open(nombre[,modo]) | Abre un objeto archivo |
| ord(c) | Opuesto de chr(int) |
| pow(x, y) | Igual que x **y |
| print(objetos) | Lo que dice en la lata, toma arg end (por defecto \n) y sep (por defecto ' ') |
| range(stop) | Lista de enteros; para < stop, inicio por defecto=0; paso por defecto=1 |
| range(desde,a,step) | Aplica la función de dos argumentos fn(x, y) acumulativamente a los items de iter. |
| repr(objeto) | Representación imprimible de un objeto |
| reversed(seq) | Obtiene un iterador invertido |
| round(n[,dígitos]) | Redondea a número de dígitos después del punto decimal |
| setattr(obj,n,v) | Como obj.n = v #nombre/valor |
| sorted(iterable) | Obtiene nueva lista ordenada |
| str(objeto) | Obtiene string de un objeto |
| sum(iterable) | Suma lista de números |
| type(objeto) | Obtiene el tipo de objeto |
| xrange() | Como range() pero mejor: devuelve un iterador |
| zip(x, y[, z]) | Devuelve lista de tuplas |

## Usando funciones
Cuando se llaman, las funciones pueden tomar argumentos posicionales y nombrados.

Por ejemplo:
```python
resultado = funcion(32, avar, c='ver', d={})
```

Los argumentos se pasan por referencia (es decir, los objetos no se copian, solo las referencias).

## Escribiendo una función simple
```python
def funct(arg1, arg2=None, *args, **kwargs):
    """explica lo que hace esta función"""
    declaraciones
    return x  # declaración opcional
```

**Nota**: Las funciones son objetos de primera clase que se instancian con atributos y pueden ser referenciadas por variables.

## Evitar argumentos mutables nombrados por defecto
Evita objetos mutables como argumentos por defecto.

Las expresiones en argumentos por defecto se evalúan cuando se define la función, no cuando se llama. Los cambios a argumentos mutables por defecto persisten entre llamadas a funciones.

```python
def mala(valor=[]):
    valor.append('a')
    return valor
print(mala())  # --> ['a']
print(mala())  # --> ['a', 'a']

def mejor(val=None):
    val = [] if val is None else val
    valor.append('a')
    return valor
```

## Funciones Lambda (funciones de expresión en línea):
```python
g = lambda x: x**2  # Nota: no hay return
print(g(8))  # imprime 64
mul = lambda a, b: a * b  # dos argumentos
mul(4, 5) == 4 * 5  # --> True
```

**Nota**: solo para expresiones, no declaraciones.

Los lambdas se usan a menudo con las funciones Python filter(), map() y reduce().

```python
# obtener solo números divisibles por tres
div3 = filter(lambda x: x%3==0, range(1,101))
```

Normalmente, puedes poner una función lambda donde pondrías una llamada a función normal.

## Cierres (Closures)
Los cierres son funciones que tienen funciones internas con datos fijados en la función interna por el ámbito léxico de la externa. Son útiles para evitar constantes duras. Wikipedia tiene una función derivada para valores variables de dx, usando un cierre.

```python
def derivada(f, dx):
    """Devuelve una función que aproxima la derivada de f usando un intervalo de dx, que debe ser apropiadamente pequeño."""
    def _funcion(x):
        return (f(x + dx) - f(x)) / dx
    return _funcion  # desde derivada(f, dx)

f_raya_x = derivada(lambda x: x*x, 0.00001)
f_raya_x(5)  # produce aprox. 10 (ie. y'=2x)
```

## Un objeto iterable
Los contenidos de un objeto iterable pueden seleccionarse uno a la vez. Tales objetos incluyen los tipos de secuencia Python y clases con el método mágico `__iter__()`, que devuelve un iterador. Un objeto iterable producirá un iterador nuevo con cada llamada a iter().
```python
iterador = iter(objeto_iterable)
```

## Iteradores
Objetos con un método next() o `__next__()`, que:
- devuelve el siguiente valor en la iteración
- actualiza el estado interno del siguiente valor
- levanta una excepción StopIteration cuando termina

**Nota**: con el ciclo `for x in y`: si y no es un iterador; Python llama a iter() para obtener uno. Con cada ciclo, llama a next() en el iterador hasta una excepción StopIteration.

```python
x = iter('XY')  # iterar un string manualmente
print(next(x))  # --> X
print(next(x))  # --> Y
print(next(x))  # --> excepción StopIteration
```

## Generadores
Las funciones generadoras son funciones resumibles que funcionan como iteradores. Pueden ser más eficientes en espacio o tiempo que iterar sobre una lista (especialmente una lista muy grande), ya que solo producen items según se necesitan.

```python
def fib(max=None):
    """generador para secuencia Fibonacci"""
    a, b = 0, 1
    while max is None or b <= max:
        yield b  # < yield es como return
        a, b = b, a+b

[i for i in fib(10)]  # > [1, 1, 2, 3, 5, 8]
```

**Nota**: una declaración return (o llegar al final de la función) termina la iteración.
**Trampa**: una declaración yield no está permitida en la cláusula try de un constructo try/finally.

## Mensajería al generador
```python
def contador_reseteable(max=None):
    j = 0
    while max is None or j <= max:
        x = yield j  # < obtiene el valor enviado
        j = j+1 if x is None else x

x = contador_reseteable(10)
print(x.send(None))  # > 0
print(x.send(5))  # > 5
print(x.send(None))  # > 6
print(x.send(11))  # > StopIteration
```

**Trampa**: debe enviarse None en la primera llamada send()

## Expresiones generadoras
Las expresiones generadoras construyen generadores, igual que construir una lista desde una comprensión. Puedes convertir una comprensión de lista en una expresión generadora simplemente reemplazando los corchetes [] con paréntesis ().
```python
[i for i in range(10)]  # comprensión de lista
list(i for i in range(10))  # lista generada
```

## Clases
Python es un lenguaje orientado a objetos con un mecanismo de clases de herencia múltiple que encapsula código de programa y datos.

## Métodos y atributos
La mayoría de los objetos tienen funciones asociadas o "métodos" que se llaman usando sintaxis de punto:
```python
obj.metodo(arg)
```

Los objetos también suelen tener atributos o valores que se acceden directamente sin usar getters y setters (muy diferente a Java o C++)
```python
instancia = Ejemplo_Clase()
print(instancia.atributo)
```

## Ejemplo simple
```python
import math
class Punto:
    # variable de clase estática, conteo de puntos
    count = 0

    def __init__(self, x, y):
        self.x = float(x)
        self.y = float(y)
        Punto.count += 1

    def __str__(self):
        return '(x={}, y={})'.format(self.x, self.y)

    def a_polar(self):
        r = math.sqrt(self.x**2 + self.y**2)
        theta = math.atan2(self.y, self.x)
        return(r, theta)

    # método estático - ejemplo trivial...
    def ejemplo_estatico(n):
        print('{}'.format(n))
    ejemplo_estatico = staticmethod(ejemplo_estatico)

# Instanciar 9 puntos y obtener coordenadas polares
for x in range(-1, 2):
    for y in range(-1, 2):
        p = Punto(x, y)
        print(p)  # usa __str__()
        print(p.a_polar())
print(Punto.count)  # ver variable estática
Punto.ejemplo_estatico(9)  # ver método estático
```

## El self
Los métodos de clase tienen un argumento extra sobre las funciones. Normalmente llamado 'self'; es una referencia a la instancia. No se usa en la llamada al método; y es provisto por Python al método. Self es como 'this' en C++ y Java.

## Métodos y variables públicos y privados
Python no impone la distinción entre datos públicos y privados. Por convención, variables y métodos que comienzan con un guión bajo deben tratarse como privados (a menos que realmente sepas lo que
