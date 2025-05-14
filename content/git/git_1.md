# Guía Completa de Git

## Introducción a Git

Git es un sistema de control de versiones distribuido que permite a los desarrolladores rastrear y gestionar los cambios en el código fuente de un proyecto. Fue creado por Linus Torvalds en 2005 para el desarrollo del núcleo de Linux. Desde entonces, se ha convertido en una herramienta esencial en el desarrollo de software.

### ¿Por qué usar Git?

* **Control de versiones:** Mantiene un historial completo de todos los cambios realizados en el proyecto.
* **Colaboración:** Permite a múltiples desarrolladores trabajar en el mismo proyecto de manera simultánea.
* **Seguridad:** Almacena de manera segura las versiones del código, protegiéndolo contra pérdidas o errores.
* **Flexibilidad:** Soporta múltiples flujos de trabajo, como Git Flow, GitHub Flow y más.

## Comandos de Inicialización

### 1. git init

Inicializa un nuevo repositorio de Git en el directorio actual.

```bash
$ git init
```

### 2. git clone <repo-url>

Clona un repositorio remoto en tu máquina local.

```bash
$ git clone https://github.com/usuario/proyecto.git
```

## Comandos de Desarrollo Diario

### 3. git status

Muestra el estado actual del repositorio, incluyendo archivos modificados, añadidos y no rastreados.

```bash
$ git status
```

### 4. git add <archivo>

Añade un archivo al área de preparación (staging area), preparándolo para el commit.

```bash
$ git add archivo.txt
```

### 5. git commit -m "Mensaje"

Guarda los cambios en el repositorio local con un mensaje descriptivo.

```bash
$ git commit -m "Agregada nueva funcionalidad"
```

## Comandos de Gestión de Ramas

### 6. git branch

Lista todas las ramas disponibles en el repositorio.

```bash
$ git branch
```

### 7. git branch <nombre-rama>

Crea una nueva rama con el nombre especificado.

```bash
$ git branch nueva-rama
```

### 8. git switch <nombre-rama>

Cambia a la rama especificada.

```bash
$ git switch nueva-rama
```

### 9. git branch -d <nombre-rama>

Elimina la rama especificada.

```bash
$ git branch -d rama-antigua
```

## Comandos de Integración y Colaboración

### 10. git merge <rama>

Fusiona los cambios de la rama especificada en la rama actual.

```bash
$ git merge desarrollo
```

### 11. git remote add <nombre> <url>

Añade un nuevo repositorio remoto.

```bash
$ git remote add origin https://github.com/usuario/proyecto.git
```

### 12. git push <remoto> <rama>

Envía los cambios al repositorio remoto.

```bash
$ git push origin main
```

### 13. git pull <remoto> <rama>

Obtiene y fusiona los cambios del repositorio remoto.

```bash
$ git pull origin main
```

## Comandos de Recuperación y Limpieza

### 14. git fetch

Descarga los cambios del repositorio remoto sin fusionarlos.

```bash
$ git fetch origin
```

### 15. git reset --hard HEAD

Desecha todos los cambios locales y restablece al último commit.

```bash
$ git reset --hard HEAD
```

### 16. git revert <hash-commit>

Revierte un commit específico creando uno nuevo que deshace los cambios.

```bash
$ git revert a1b2c3d
```

## Comandos Avanzados y Utilidades

### 17. git diff <a> <b>

Compara dos commits, ramas o archivos específicos.

```bash
$ git diff main desarrollo
```

### 18. git show <hash>

Muestra los detalles de un commit específico.

```bash
$ git show a1b2c3d
```

### 19. git stash

Guarda cambios temporales y limpia el working tree.

```bash
$ git stash
```

### 20. git stash pop

Restaura los cambios guardados en el stash.

```bash
$ git stash pop
```

### 21. git cherry-pick <hash>

Aplica un commit específico en la rama actual.

```bash
$ git cherry-pick a1b2c3d
```

### 22. git rebase <base>

Reaplica commits sobre otra base.

```bash
$ git rebase main
```
