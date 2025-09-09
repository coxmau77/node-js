# 🛒 Tienda CLI con Node.js y Axios

Este proyecto es una **herramienta de línea de comandos (CLI)** que permite gestionar productos de una tienda online consumiendo la API de [FakeStore](https://fakestoreapi.com/). Está construido con **Node.js** y utiliza **Axios** para las peticiones HTTP.

---

## ⚡ Instalación Rápida

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tienda-cli.git
   cd tienda-cli
   ```

2. Instalar dependencias:

   ```bash
   npm i
   ```

3. Ejecutar un comando de prueba:

   ```bash
   npm run start GET products
   ```

✅ Si ves la lista de productos en la consola, todo está funcionando correctamente.

---

## ⚙️ Configuración Inicial (opcional)

Si prefieres iniciar desde cero:

```bash
mkdir tienda-cli && cd tienda-cli
npm init -y
npm i axios E-
```

Luego copia el archivo `index.js` y agrega en `package.json`:

```json
"scripts": {
  "start": "node index.js"
}
```

---

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

- Si el comando está mal escrito o incompleto, se mostrará una lista de comandos disponibles.
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
  "image": "https://i.pravatar.cc"
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

## Utilización de `axios`

💡**usar `axios` en lugar de `fetch` puede hacer tu código más legible y profesional**, sobre todo porque `axios` te simplifica el manejo de errores, configuración de headers y parsing de JSON.

## 📌 Ventajas de `axios` sobre `fetch`

1. **JSON automático** → no necesitas llamar a `.json()`, axios lo hace por vos.
2. **Errores claros** → `axios` lanza excepciones automáticamente para códigos HTTP no exitosos (`404`, `500`, etc.), mientras que con `fetch` tenés que validar manualmente `response.ok`.
3. **Configuración fácil** → podés definir una instancia base (`baseURL`, headers por defecto, timeouts).
4. **Más extendido en proyectos reales** → la mayoría de APIs en el mundo real se consumen con `axios` (aunque `fetch` se está usando cada vez más en Node 18+).

---

## 📌 Ejemplo con `axios`

Primero instalamos:

```bash
npm i axios E-
```

Luego adaptamos tu código. Por ejemplo, la función `createProduct` pasaría de esto 👇

```js
const response = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newProduct),
});

if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
const createdProduct = await response.json();
```

a esto con axios 👇

```js
import axios from "axios";

const createdProduct = await axios.post(API_URL, newProduct);
console.log("✅ Product Created Successfully:");
console.log(createdProduct.data);
```

---

## 📌 Estructura recomendada con `axios`

Podrías incluso crear una **instancia preconfigurada**:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// Ejemplo GET
const getAllProducts = async () => {
  console.log("📦 Fetching all products...");
  const { data } = await api.get("/products");
  console.log("✅ All Products:");
  console.log(data);
};

// Ejemplo POST
const createProduct = async (title, price, category) => {
  if (!title || !price || !category) {
    console.log("❌ Error: Debes proporcionar title, price y category.");
    console.log(
      '👉 Ejemplo: npm run start POST products "New T-Shirt" 12.99 clothing'
    );
    return;
  }

  console.log("🛠 Creating a new product...");

  const newProduct = {
    title,
    price: parseFloat(price),
    category,
    description: "A default description",
    image: "https://i.pravatar.cc",
  };

  const { data } = await api.post("/products", newProduct);
  console.log("✅ Product Created Successfully:");
  console.log(data);
};
```

---

✅ Con axios:

- Menos código repetitivo.
- Manejo de errores y datos más elegante.
- Fácil de escalar (ej: agregar interceptores para logs o autenticación).

---
