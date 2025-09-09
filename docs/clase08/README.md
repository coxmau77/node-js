# 📌 Guía de Pre-Entrega de Proyecto

Propongo estructurarlo en **3 bloques principales**:

1. Preparación del entorno.
2. Construcción de la lógica (comandos y API).
3. Buenas prácticas y tips de desarrollo.

Tu desafío es integrar todo lo aprendido en un único programa. El objetivo es construir una **herramienta en Node.js** que maneje productos de una tienda en línea usando la terminal y la API FakeStore.

---

## 1️⃣ Configuración Inicial del Proyecto

1. Crea un directorio para tu proyecto.

   ```bash
   mkdir tienda-cli && cd tienda-cli
   ```

2. Crea un archivo `index.js` (será el punto de entrada).
3. Inicializa Node.js y configura npm:

   ```bash
   npm init -y
   ```

4. Abre `package.json` y agrega:

   ```json
   "type": "module"
   ```

   👉 Esto habilita el uso de **ESModules** (`import/export`).

5. Configura un script para ejecutar el programa:

   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```

✅ Con esto ya tienes un entorno limpio y profesional.

---

## 2️⃣ Lógica de Gestión de Productos

Usaremos la API de **FakeStore**:
📍 [https://fakestoreapi.com/products](https://fakestoreapi.com/products)

La aplicación debe interpretar los comandos escritos en la terminal (`process.argv`) y ejecutar acciones según la operación indicada.

---

### 🔹 A) Consultar Todos los Productos (GET)

Comando:

```bash
npm run start GET products
```

👉 Acción: Hace una petición `GET` a la API y muestra todos los productos.
📖 Doc: [getAllProducts](https://fakestoreapi.com/docs#tag/Products/operation/getAllProducts)

---

### 🔹 B) Consultar un Producto Específico (GET)

Comando:

```bash
npm run start GET products/<productId>
```

Ejemplo:

```bash
npm run start GET products/15
```

👉 Acción: Obtiene el producto con el `productId` indicado.
📖 Doc: [getProductById](https://fakestoreapi.com/docs#tag/Products/operation/getProductById)

---

### 🔹 C) Crear un Producto Nuevo (POST)

Comando:

```bash
npm run start POST products <title> <price> <category>
```

Ejemplo:

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

👉 Acción: Envía una petición `POST` con los datos (`title`, `price`, `category`) y devuelve el resultado.
📖 Doc: [addProduct](https://fakestoreapi.com/docs#tag/Products/operation/addProduct)

---

### 🔹 D) Eliminar un Producto (DELETE)

Comando:

```bash
npm run start DELETE products/<productId>
```

Ejemplo:

```bash
npm run start DELETE products/7
```

👉 Acción: Elimina el producto correspondiente al `productId`.
📖 Doc: [deleteProduct](https://fakestoreapi.com/docs#tag/Products/operation/deleteProduct)

---

### 🔹 E) Actualizar un Producto (PUT)

Comando esperado:

```bash
npm run start PUT products/<productId> <title> <price> <category>
```

👉 Acción: Actualiza los datos de un producto en la API.
📖 Doc: [updateProduct](https://fakestoreapi.com/docs#tag/Products/operation/updateProduct)

---

## 3️⃣ Tips de Desarrollo

- Usa `process.argv` para capturar los comandos de la terminal.
- Implementa `fetch` (ya disponible en Node.js 18+).
- Aplica **destructuring** y **spread operator** para trabajar con los datos.
- Usa **métodos de arrays y strings** (`split`, `map`, `filter`, etc.) para procesar argumentos.
- Mantén un código modular y organizado para facilitar mejoras futuras.

---

## 🎯 Actividad Práctica

1. Configura el proyecto siguiendo el **Bloque 1**.
2. Implementa cada requerimiento de **Bloque 2**, uno por uno.
3. Prueba los comandos en la terminal y valida las respuestas.

---

👉 Con esta estructura ya tienes una **guía paso a paso clara, organizada y profesional** para trabajar tu pre-entrega.

¿Quieres que te arme también un **esqueleto de código en `index.js`** con la base lista (captura de comandos y switch para operaciones) para que tengas el punto de partida?
