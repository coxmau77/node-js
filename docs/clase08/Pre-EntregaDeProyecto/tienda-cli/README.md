# Tienda CLI

Esta es una herramienta de línea de comandos (CLI) desarrollada en Node.js para interactuar con la [FakeStore API](https://fakestoreapi.com/). Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los productos de la tienda.

## Requisitos

- Node.js (v18+ recomendado)

## Instalación

1. Clona el repositorio o descarga los archivos.
2. Navega al directorio `tienda-cli`.
3. Ejecuta `npm install` (aunque este proyecto no tiene dependencias externas, es una buena práctica).

## Uso

Todos los comandos se ejecutan a través del script `start` de npm desde la raíz del directorio `tienda-cli`.

---

### 1. Obtener todos los productos (GET)

Devuelve una lista de todos los productos disponibles en la tienda.

**Comando:**
```bash
npm run start GET products
```

---

### 2. Obtener un producto por su ID (GET)

Busca y devuelve un producto específico según el ID proporcionado.

**Comando:**
```bash
npm run start GET products/<id>
```

**Ejemplo:**
```bash
npm run start GET products/10
```

---

### 3. Crear un nuevo producto (POST)

Crea un nuevo producto. La API de FakeStore simula la creación y devuelve el nuevo objeto con un ID asignado.

**Comando:**
```bash
npm run start POST products <title> <price> <category>
```

**Ejemplo (si el título tiene espacios, usa comillas):**
```bash
npm run start POST products "Camiseta de Dinosaurio" 25.50 "ropa"
```

---

### 4. Actualizar un producto existente (PUT)

Actualiza la información de un producto existente, identificado por su ID. La API simula la actualización.

**Comando:**
```bash
npm run start PUT products/<id> <title> <price> <category>
```

**Ejemplo:**
```bash
npm run start PUT products/5 "Gorra de Sol" 15.99 "accesorios"
```

---

### 5. Eliminar un producto (DELETE)

Elimina un producto según su ID. La API simula la eliminación y devuelve el objeto eliminado como confirmación.

**Comando:**
```bash
npm run start DELETE products/<id>
```

**Ejemplo:**
```bash
npm run start DELETE products/7
```
