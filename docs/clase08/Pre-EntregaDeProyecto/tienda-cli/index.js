// index.js (Versión Refactorizada con Axios)

import axios from "axios";

// 🔹 Constantes y Configuración
const BASE_URL = "https://fakestoreapi.com";
const ENTITY_PRODUCT = "products";

// 🔹 Instancia base de Axios configurada
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// 🔹 Argumentos de la Terminal
// process.argv = ["node", "index.js", "POST", "products", "New T-Shirt", "12.99", "clothing"]
const args = process.argv.slice(2);
const [method, resource, ...payloadArgs] = args;

// --- 1. Service Functions (Solo Lógica API - Desacopladas) ---

// Las funciones de servicio reciben argumentos limpios y correctos.

const getAllProducts = async () => {
  console.log("📦 Fetching all products...");
  const { data } = await api.get(`/${ENTITY_PRODUCT}`);
  console.log("✅ All Products Fetched.");
  console.log(data);
};

const getProductById = async (id) => {
  console.log(`🔍 Fetching product with ID: ${id}...`);
  const { data } = await api.get(`/${ENTITY_PRODUCT}/${id}`);
  console.log("✅ Product Found.");
  console.log(data);
};

// Recibe un objeto 'productData' listo para ser enviado
const createProduct = async (productData) => {
  console.log("🛠 Creating a new product...");

  // Añadimos datos por defecto (se hace aquí o en main, se mantiene la coherencia con el original)
  const newProduct = {
    ...productData,
    description: "A default description",
    image: "https://i.pravatar.cc",
  };

  const { data } = await api.post(`/${ENTITY_PRODUCT}`, newProduct);
  console.log("✅ Product Created Successfully (simulation):");
  console.log(data);
};

// Recibe el ID y un objeto 'productData' listo
const updateProduct = async (id, productData) => {
  console.log(`📝 Updating product with ID: ${id}...`);
  const { data } = await api.put(`/${ENTITY_PRODUCT}/${id}`, productData);
  console.log("✅ Product Updated Successfully (simulation):");
  console.log(data);
};

const deleteProduct = async (id) => {
  console.log(`🗑 Deleting product with ID: ${id}...`);
  const { data } = await api.delete(`/${ENTITY_PRODUCT}/${id}`);
  console.log("✅ Product Deleted Successfully (simulation):");
  console.log(data);
};

// Ayuda de comandos (Centralizada y usando constantes)
const showHelp = (message = "❓ Command not recognized or incomplete.") => {
  console.log(message);
  console.log("Available commands:");
  console.log(`  - npm run start GET ${ENTITY_PRODUCT}`);
  console.log(`  - npm run start GET ${ENTITY_PRODUCT}/<id>`);
  console.log(
    `  - npm run start POST ${ENTITY_PRODUCT} <title> <price> <category>`
  );
  console.log(
    `  - npm run start PUT ${ENTITY_PRODUCT}/<id> <title> <price> <category>`
  );
  console.log(`  - npm run start DELETE ${ENTITY_PRODUCT}/<id>`);
};

// --- 2. Main Controller (Lógica de Parsing, Validación y Control) ---

const main = async () => {
  try {
    // 1. Parsing del recurso (ej: "products/1")
    const [entityName, id] = (resource || "").split("/");

    // 2. Validación de la Entidad
    if (entityName !== ENTITY_PRODUCT) {
      return showHelp("❌ Error: Solo se soporta la entidad 'products'.");
    }

    // 3. Control y Despacho
    switch (method.toUpperCase()) {
      case "GET":
        // GET: products o products/<id>
        id ? await getProductById(id) : await getAllProducts();
        break;

      case "POST":
        // POST: products <title> <price> <category> (3 argumentos)
        if (payloadArgs.length !== 3) {
          return showHelp(
            "❌ Error: POST requiere <title>, <price> y <category>."
          );
        }
        const [titlePost, pricePost, categoryPost] = payloadArgs;

        // Preparamos el objeto de datos limpio y tipado antes de llamar al servicio
        await createProduct({
          title: titlePost,
          price: parseFloat(pricePost),
          category: categoryPost,
        });
        break;

      case "PUT":
        // PUT: products/<id> <title> <price> <category> (Requiere ID y 3 argumentos)
        if (!id || payloadArgs.length !== 3) {
          return showHelp(
            "❌ Error: PUT requiere <id>, <title>, <price> y <category>."
          );
        }
        const [titlePut, pricePut, categoryPut] = payloadArgs;

        // Preparamos el objeto de datos limpio y tipado
        await updateProduct(id, {
          title: titlePut,
          price: parseFloat(pricePut),
          category: categoryPut,
        });
        break;

      case "DELETE":
        // DELETE: products/<id> (Requiere ID)
        if (!id) {
          return showHelp("❌ Error: DELETE requiere <id>.");
        }
        await deleteProduct(id);
        break;

      default:
        showHelp();
    }
  } catch (error) {
    // Manejo de errores mejorado para Axios
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `❌ API Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else {
      console.error("❌ Unexpected Error:", error.message);
    }
  } finally {
    console.log("🏁 Execution finished.");
  }
};

main();
