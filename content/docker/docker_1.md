# Docker: Conceptos Detallados con Ejemplos

## Introducción a Docker

### Containers (Contenedores)

Los contenedores son unidades de software empaquetadas que incluyen todo lo necesario para ejecutar una aplicación: código, runtime, herramientas del sistema, bibliotecas y configuraciones. Proporcionan un entorno aislado y consistente para la ejecución de aplicaciones.

**Ejemplo básico:**
```bash
docker run hello-world
```
Este comando descarga una imagen mínima y ejecuta un contenedor que simplemente muestra un mensaje de bienvenida.

### Beyond Basic Containers (Más allá de los contenedores básicos)

Los contenedores modernos van más allá del simple aislamiento:
- Comparten el kernel del sistema operativo anfitrión
- Son más ligeros que las máquinas virtuales
- Pueden comunicarse entre sí a través de redes definidas

### Along Comes Docker (La llegada de Docker)

Docker simplificó el uso de contenedores al:
- Estandarizar el formato de contenedores
- Proporcionar herramientas fáciles de usar
- Crear un ecosistema alrededor de los contenedores

### Why We Should Care as Developers (Por qué nos debería importar como desarrolladores)

Ventajas para desarrolladores:
- **Consistencia**: "Funciona en mi máquina" deja de ser un problema
- **Rapidez**: Los contenedores inician en segundos
- **Aislamiento**: Diferentes versiones de dependencias pueden coexistir
- **Portabilidad**: Se puede ejecutar en cualquier lugar con Docker instalado

## Getting Started (Empezando)

### Installing Docker (Instalando Docker)

Proceso típico de instalación:
1. Descargar Docker Desktop para Windows/Mac o Docker Engine para Linux
2. Seguir el asistente de instalación
3. Verificar la instalación:
```bash
docker --version
```

### Running Our First Container (Ejecutando nuestro primer contenedor)

Ejemplo con Nginx:
```bash
docker run -d -p 8080:80 --name mi-web nginx
```
- `-d`: Ejecuta en segundo plano (detached)
- `-p 8080:80`: Mapea puerto 8080 del host al 80 del contenedor
- `--name`: Asigna un nombre al contenedor

### How Containers Work (Cómo funcionan los contenedores)

Componentes clave:
1. **Namespaces**: Aislan procesos, red, usuarios, etc.
2. **Cgroups**: Limitan y monitorean recursos (CPU, memoria)
3. **Union File Systems**: Capas de imágenes superpuestas

## Working With Containers (Trabajando con contenedores)

### Images (Imágenes)

Las imágenes son plantillas de solo lectura para crear contenedores. Ejemplo de imágenes populares:
- `nginx`: Servidor web
- `mysql`: Base de datos
- `python`: Entorno para Python

Listar imágenes locales:
```bash
docker images
```

Descargar una imagen:
```bash
docker pull ubuntu:20.04
```

### Controlling Containers (Control de contenedores)

Comandos esenciales:
- Iniciar/Detener:
  ```bash
  docker start mi-contenedor
  docker stop mi-contenedor
  ```
- Ver contenedores en ejecución:
  ```bash
  docker ps
  ```
- Ver todos los contenedores (incluyendo detenidos):
  ```bash
  docker ps -a
  ```
- Eliminar un contenedor:
  ```bash
  docker rm mi-contenedor
  ```

### Container Data (Datos en contenedores)

Los contenedores son efímeros por defecto. Para persistir datos:

1. **Volúmenes**:
```bash
docker run -v /ruta/local:/ruta/contenedor mysql
```

2. **Bind mounts**:
```bash
docker run --mount type=bind,source=/ruta/local,target=/ruta/contenedor nginx
```

Ejemplo práctico con MySQL:
```bash
docker run -d --name mi-mysql -v mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret mysql
```

### Networking (Redes)

Docker proporciona diferentes tipos de red:
- **bridge**: Red por defecto para contenedores
- **host**: Comparte red con el host
- **none**: Sin red

Crear una red personalizada:
```bash
docker network create mi-red
```

Conectar contenedores:
```bash
docker run -d --name web --network mi-red nginx
docker run -it --network mi-red alpine ping web
```

## Containerizing Your Application (Contenerizando tu aplicación)

### Getting PHP to Run (Ejecutando PHP)

Ejemplo con un script PHP simple:
```bash
docker run -it --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp php:8.0-cli php script.php
```

### Getting a Database (Obteniendo una base de datos)

Ejemplo con MySQL:
```bash
docker run --name mi-mysql -e MYSQL_ROOT_PASSWORD=mi-contraseña -d mysql:8.0
```

### Linking PHP to the MySQL Server (Conectando PHP a MySQL)

Ejemplo con PHP y MySQL en la misma red:
```bash
docker network create php-mysql-net
docker run --name mysql-container --network php-mysql-net -e MYSQL_ROOT_PASSWORD=secret -d mysql
docker run --network php-mysql-net -it php:8.0-cli bash
# Dentro del contenedor PHP:
mysql -h mysql-container -u root -p
```

### Getting a Web Server (Obteniendo un servidor web)

Ejemplo con Nginx y PHP-FPM:
```bash
docker run --name mi-nginx -v ./html:/usr/share/nginx/html -p 8080:80 -d nginx
docker run --name mi-php-fpm -v ./html:/var/www/html -d php:8.0-fpm
```

### Testing the application (Probando la aplicación)

Ver logs de un contenedor:
```bash
docker logs mi-contenedor
```

Ejecutar pruebas dentro del contenedor:
```bash
docker exec -it mi-contenedor php tests/unitarios.php
```

### Thinking About Architecture (Pensando en la arquitectura)

Consideraciones:
- Un contenedor por servicio (microservicios)
- Comunicación vía red definida
- Orquestación para múltiples contenedores

## Creating Custom Containers (Creando contenedores personalizados)

### Dockerfiles

Archivo de configuración para construir imágenes personalizadas. Ejemplo para una app Node.js:

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### Building a Custom Image (Construyendo una imagen personalizada)

Construir la imagen:
```bash
docker build -t mi-app-node .
```

Ejecutar el contenedor:
```bash
docker run -p 3000:3000 -d mi-app-node
```

## Docker Tools (Herramientas de Docker)

### Docker Machine

Herramienta para gestionar hosts Docker (ahora menos común con Docker Desktop).

Ejemplo:
```bash
docker-machine create --driver virtualbox mi-maquina
eval $(docker-machine env mi-maquina)
```

### Docker Swarm

Herramienta de orquestación nativa de Docker para clusters.

Ejemplo básico:
```bash
docker swarm init
docker service create --replicas 3 --name mi-servicio nginx
```

### Docker Compose

Herramienta para definir y ejecutar aplicaciones multi-contenedor.

Ejemplo `docker-compose.yml` para WordPress:
```yaml
version: '3'
services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
volumes:
  db_data:
```

Ejecutar con:
```bash
docker-compose up -d
```

## Conceptos Clave Resumidos

### Images (Imágenes)
Plantillas inmutables para crear contenedores. Ejemplo:
```bash
docker pull python:3.9-slim
```

### Containers (Contenedores)
Instancias ejecutables de imágenes. Ejemplo:
```bash
docker run -it python:3.9-slim bash
```

### docker-machine
Gestiona hosts Docker (legacy). Ejemplo:
```bash
docker-machine ls
```

### docker-compose
Orquesta múltiples contenedores. Ejemplo:
```bash
docker-compose down && docker-compose up --build
```

## Ejemplo Completo: Aplicación Web con Flask, Redis y MySQL

1. `Dockerfile` para la app Flask:
```dockerfile
FROM python:3.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

2. `docker-compose.yml`:
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - redis
      - mysql
  redis:
    image: redis
    ports:
      - "6379:6379"
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: mydb
    volumes:
      - mysql_data:/var/lib/mysql
volumes:
  mysql_data:
```

3. Ejecutar todo:
```bash
docker-compose up -d
```

Este ejemplo muestra cómo Docker permite definir y gestionar fácilmente una arquitectura compleja con múltiples servicios interconectados.

# Cheatsheet de Comandos Docker en Español

## Imágenes (Images)

### Listar imágenes
**Comando:** `docker images`  
**Explicación:** Muestra todas las imágenes Docker disponibles en la máquina local, incluyendo información como:
- REPOSITORY: Nombre del repositorio
- TAG: Versión de la imagen
- IMAGE ID: Identificador único
- CREATED: Fecha de creación
- SIZE: Tamaño de la imagen

**Ejemplo:**
```bash
docker images
```
Salida típica:
```
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    2b7d6430f78d   2 weeks ago    142MB
ubuntu       20.04     d2e4e1f51132   3 weeks ago    72.8MB
```

### Eliminar imagen
**Comando:** `docker rmi [imagen]`  
**Explicación:** Elimina una imagen Docker específica, siempre y cuando no esté siendo utilizada por ningún contenedor.  
**Opciones útiles:**
- `-f`: Fuerza la eliminación (útil cuando hay contenedores huérfanos)

**Ejemplos:**
```bash
# Eliminar imagen por nombre
docker rmi nginx

# Eliminar imagen por ID
docker rmi d2e4e1f51132

# Forzar eliminación
docker rmi -f ubuntu:20.04
```

### Descargar imagen
**Comando:** `docker pull [imagen][:tag]`  
**Explicación:** Descarga una imagen desde un registro Docker (por defecto Docker Hub) sin ejecutarla.  
**Notas:**
- Si no se especifica tag, se usa `latest` por defecto
- Se pueden especificar versiones concretas (ej: `python:3.9`)

**Ejemplos:**
```bash
# Descargar última versión
docker pull nginx

# Descargar versión específica
docker pull mysql:8.0

# Descargar imagen de otro registro
docker pull ghcr.io/organizacion/imagen:tag
```

## Contenedores (Containers)

### Listar contenedores
**Comando:** `docker ps [-a]`  
**Explicación:** Muestra los contenedores en ejecución. Con `-a` muestra todos los contenedores (incluyendo detenidos).  
**Información mostrada:**
- CONTAINER ID: Identificador único
- IMAGE: Imagen base
- COMMAND: Comando ejecutado
- STATUS: Estado (running, exited, etc.)
- PORTS: Mapeo de puertos
- NAMES: Nombre asignado

**Ejemplos:**
```bash
# Contenedores activos
docker ps

# Todos los contenedores
docker ps -a

# Mostrar sólo IDs
docker ps -aq
```

### Crear y ejecutar contenedor
**Comando:** `docker run [opciones] IMAGEN [comando] [argumentos]`  
**Explicación:** Crea un nuevo contenedor a partir de una imagen y lo ejecuta.  
**Opciones comunes:**
- `-d`: Ejecuta en segundo plano (modo detached)
- `-p`: Mapea puertos (host:contenedor)
- `--name`: Asigna nombre al contenedor
- `-v`: Monta volúmenes
- `-e`: Establece variables de entorno
- `-it`: Modo interactivo con terminal

**Ejemplos:**
```bash
# Contenedor simple
docker run ubuntu echo "Hola Mundo"

# Contenedor en segundo plano con nombre
docker run -d --name mi-web -p 8080:80 nginx

# Contenedor interactivo
docker run -it ubuntu bash

# Con variables de entorno
docker run -e "MYSQL_ROOT_PASSWORD=secret" mysql
```

### Iniciar contenedor
**Comando:** `docker start [nombre]`  
**Explicación:** Inicia un contenedor previamente creado pero detenido.  
**Ejemplos:**
```bash
# Por nombre
docker start mi-web

# Por ID
docker start c3f279d17e0a
```

### Conectar a contenedor en ejecución
**Comando:** `docker attach [nombre]`  
**Explicación:** Permite reconectarse a un contenedor que se está ejecutando en segundo plano.  
**Nota:** Para salir sin detener el contenedor usar `CTRL-p CTRL-q`

**Ejemplo:**
```bash
docker attach mi-contenedor
```

### Detener contenedor
**Comando:** `docker stop [nombre]`  
**Explicación:** Detiene un contenedor en ejecución de manera ordenada (envía señal SIGTERM).  
**Alternativa:** `docker kill` para forzar la detención (SIGKILL)

**Ejemplos:**
```bash
# Por nombre
docker stop mi-web

# Por ID
docker stop c3f279d17e0a

# Detener todos los contenedores
docker stop $(docker ps -aq)
```

### Eliminar contenedor
**Comando:** `docker rm [-f] [nombre]`  
**Explicación:** Elimina uno o más contenedores.  
**Opciones:**
- `-f`: Fuerza eliminación (para contenedores en ejecución)
- `-v`: Elimina volúmenes asociados

**Ejemplos:**
```bash
# Eliminar contenedor detenido
docker rm mi-contenedor

# Forzar eliminación
docker rm -f contenedor-activo

# Eliminar todos los contenedores
docker rm -f $(docker ps -aq)
```

### Crear contenedor sin ejecutar
**Comando:** `docker create [opciones] IMAGEN [comando] [argumentos]`  
**Explicación:** Crea un contenedor pero no lo inicia (similar a `docker run` pero sin el start).  
**Ejemplo:**
```bash
docker create --name mi-db -e "MYSQL_ROOT_PASSWORD=secret" mysql:8.0
```

## Docker Machine

### Crear máquina
**Comando:** `docker-machine create --driver [controlador] [nombre-maquina]`  
**Explicación:** Crea una nueva máquina virtual con Docker instalado.  
**Controladores comunes:**
- `virtualbox`: Para VirtualBox
- `vmwarefusion`: Para VMware Fusion
- `digitalocean`: Para DigitalOcean droplets

**Ejemplo:**
```bash
docker-machine create --driver virtualbox dev
```

### Listar máquinas
**Comando:** `docker-machine ls`  
**Explicación:** Muestra todas las máquinas Docker disponibles y su estado.  
**Ejemplo:**
```bash
docker-machine ls
```
Salida típica:
```
NAME   ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
dev    -        virtualbox   Running   tcp://192.168.99.100:2376           v20.10.7   
prod   -        digitalocean Running   tcp://167.71.12.34:2376             v20.10.7
```

### Configurar entorno para máquina
**Comando:** `docker-machine env [nombre-maquina]`  
**Explicación:** Muestra las variables de entorno necesarias para conectar el cliente Docker a una máquina específica.  
**Uso típico:**
```bash
eval $(docker-machine env dev)
```

### Iniciar/Detener máquina
**Comandos:**
- `docker-machine start [nombre-maquina]`: Inicia una máquina detenida
- `docker-machine stop [nombre-maquina]`: Detiene una máquina en ejecución
- `docker-machine restart [nombre-maquina]`: Reinicia una máquina

**Ejemplos:**
```bash
docker-machine start dev
docker-machine stop prod
docker-machine restart staging
```

### Obtener IP de máquina
**Comando:** `docker-machine ip [nombre-maquina]`  
**Explicación:** Devuelve la dirección IP de la máquina especificada.  
**Ejemplo:**
```bash
docker-machine ip dev
# Salida: 192.168.99.100
```

### Eliminar máquina
**Comando:** `docker-machine rm [nombre-maquina]`  
**Explicación:** Elimina permanentemente una máquina Docker.  
**Ejemplo:**
```bash
docker-machine rm old-machine
```

### Conectar por SSH
**Comando:** `docker-machine ssh [nombre-maquina]`  
**Explicación:** Establece una conexión SSH con la máquina especificada.  
**Ejemplo:**
```bash
docker-machine ssh dev
```

## Docker Compose

### Iniciar proyecto
**Comando:** `docker-compose up -d`  
**Explicación:** Construye (si es necesario), (re)crea, inicia y adjunta los contenedores para un servicio.  
**Opciones:**
- `-d`: Ejecuta en segundo plano (detached)
- `--build`: Fuerza la reconstrucción de imágenes
- `--force-recreate`: Recrea contenedores incluso si no cambiaron

**Ejemplo:**
```bash
docker-compose up -d --build
```

### Mostrar información de contenedores
**Comando:** `docker-compose ps`  
**Explicación:** Lista los contenedores del proyecto con su estado actual.  
**Ejemplo:**
```bash
docker-compose ps
```
Salida típica:
```
      Name                     Command               State           Ports         
---------------------------------------------------------------------------------
webapp_nginx_1   nginx -g daemon off;             Up      0.0.0.0:8080->80/tcp
webapp_app_1     python app.py                    Up      5000/tcp              
webapp_db_1      docker-entrypoint.sh mysqld      Up      3306/tcp, 33060/tcp
```

### Eliminar proyecto
**Comando:** `docker-compose rm`  
**Explicación:** Elimina los contenedores detenidos del proyecto.  
**Opciones:**
- `-f`: No pide confirmación
- `-v`: Elimina también los volúmenes anónimos

**Ejemplo:**
```bash
docker-compose rm -fv
```

### Detener proyecto
**Comando:** `docker-compose stop`  
**Explicación:** Detiene los contenedores en ejecución sin eliminarlos.  
**Ejemplo:**
```bash
docker-compose stop
```

### Escalar servicios
**Comando:** `docker-compose scale [servicio]=[cantidad]`  
**Explicación:** Aumenta o disminuye el número de contenedores para un servicio.  
**Ejemplos:**
```bash
# Escalar servicio web a 3 instancias
docker-compose scale web=3

# Reducir servicio worker a 1 instancia
docker-compose scale worker=1
```

**Nota:** En versiones recientes de Docker Compose, se recomienda usar `docker-compose up --scale servicio=cantidad` en su lugar.
