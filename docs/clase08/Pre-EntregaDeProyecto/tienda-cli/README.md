# 🛒 Tienda CLI con Node.js y Axios

Este proyecto es una **herramienta de línea de comandos (CLI)** que permite gestionar productos de una tienda online consumiendo la API de [FakeStore](https://fakestoreapi.com/). Está construido con **Node.js** y utiliza **Axios** para las peticiones HTTP.

## 🚀 Comandos Disponibles

La estructura general de los comandos es:

```bash
npm run start <METHOD> <RESOURCE> [ARGS]
```

### 🔹 1. Obtener todos los productos (GET)

```bash
npm run start GET products
```

👉 Devuelve una lista con todos los productos de la tienda.

---

### 🔹 2. Obtener un producto por ID (GET)

```bash
npm run start GET products/<id>
```

Ejemplo:

```bash
npm run start GET products/5
```

👉 Devuelve el producto con el ID especificado.

---

### 🔹 3. Crear un producto nuevo (POST)

```bash
npm run start POST products <title> <price> <category>
```

Ejemplo:

```bash
npm run start POST products "New T-Shirt" 19.99 clothing
```

👉 Crea un producto con título, precio y categoría. Se agregan por defecto `description` e `image`.

---

### 🔹 4. Actualizar un producto (PUT)

```bash
npm run start PUT products/<id> <title> <price> <category>
```

Ejemplo:

```bash
npm run start PUT products/3 "Updated Jeans" 39.99 clothing
```

👉 Actualiza el producto con el ID indicado.

---

### 🔹 5. Eliminar un producto (DELETE)

```bash
npm run start DELETE products/<id>
```

Ejemplo:

```bash
npm run start DELETE products/7
```

👉 Elimina el producto con el ID especificado.

---

## 📌 Notas

- Si el comando está mal escrito o incompleto, se mostrará una lista de comandos disponibles (ver `showHelp`).
- Axios está configurado con un `baseURL` y headers JSON para simplificar las llamadas.
- Este proyecto es una **simulación**: los cambios (POST, PUT, DELETE) no persisten en la API de FakeStore.

---

## 🖥️ Ejemplos de salida en consola

### 📦 GET products

```bash
npm run start GET products
```

Salida esperada (resumen):

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "category": "men's clothing"
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "category": "men's clothing"
  }
]
```

### 🛠 POST products

```bash
npm run start POST products "New T-Shirt" 19.99 clothing
```

Salida esperada:

```json
{
  "id": 21,
  "title": "New T-Shirt",
  "price": 19.99,
  "category": "clothing",
  "description": "A default description",
  "image": "[https://i.pravatar.cc](https://i.pravatar.cc)"
}
```

### 📝 PUT products/3

```bash
npm run start PUT products/3 "Updated Jeans" 39.99 clothing
```

Salida esperada:

```json
{
  "id": 3,
  "title": "Updated Jeans",
  "price": 39.99,
  "category": "clothing"
}
```

### 🗑 DELETE products/7

```bash
npm run start DELETE products/7
```

Salida esperada:

```json
{
  "id": 7,
  "title": "Product deleted"
}
```

---

## 🏁 Ejecución final

Ejemplo completo:

```bash
npm run start POST products "Sneakers Pro" 59.99 shoes
npm run start GET products
npm run start PUT products/5 "Sneakers Ultra" 79.99 shoes
npm run start DELETE products/10
```

---

<!-- ## Utilización de `axios` y Diseño Limpio

💡 **Usar `axios` con una estructura de _Controller-Service_ limpia hace que el código sea más legible y profesional.**

## 📌 Ventajas de `axios` sobre `fetch`

1.  **JSON automático** → no necesitas llamar a `.json()`, axios lo hace por vos.
2.  **Errores claros** → `axios` lanza excepciones automáticamente para códigos HTTP no exitosos (`404`, `500`, etc.), lo que nos permite usar un bloque `try...catch` centralizado.
3.  **Configuración fácil** → podés definir una instancia base (`baseURL`, headers por defecto, timeouts).
4.  **Más extendido en proyectos reales** → la mayoría de APIs en el mundo real se consumen con `axios`.

--- -->

<!-- ## 📌 Estructura Refactorizada con `axios`

La refactorización clave del proyecto fue **separar la lógica de _input_ del usuario (Controller) de la lógica de red (Service)**.

### **1. Configuración de la Instancia Global**

```js
import axios from "axios";

const api = axios.create({
  baseURL: "[https://fakestoreapi.com](https://fakestoreapi.com)",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});
```

### **2. Función de Servicio (Limpia)**

La función solo recibe el objeto de datos listo y llama a la API.

```js
// La función solo recibe el objeto de datos limpio (productData)
const createProduct = async (productData) => {
  console.log("🛠 Creating a new product..."); // Añadimos datos por defecto

  const newProduct = {
    ...productData,
    description: "A default description",
    image: "[https://i.pravatar.cc](https://i.pravatar.cc)",
  };

  const { data } = await api.post("/products", newProduct);
  console.log("✅ Product Created Successfully (simulation):");
  console.log(data);
};
```

### **3. Lógica de Control (Manejo de la Terminal)**

El `main` _Controller_ se encarga de validar y preparar los datos de la terminal.

```js
// Extracto del Controller (main) para el caso POST
case "POST":
  // Validamos si tenemos los 3 argumentos del CLI
  if (payloadArgs.length !== 3) {
    return showHelp("❌ Error: POST requiere <title>, <price> y <category>.");
  }
  const [titlePost, pricePost, categoryPost] = payloadArgs;

  // Preparamos el objeto y hacemos el casting de tipos
  await createProduct({
      title: titlePost,
      price: parseFloat(pricePost),
      category: categoryPost
  });
  break;
// ... otros métodos
``` -->
