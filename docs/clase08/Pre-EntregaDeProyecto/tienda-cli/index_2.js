// index.js
import axios from "axios";

// 🔹 Instancia base de Axios configurada
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// 🔹 Capturamos argumentos desde la terminal
// process.argv = ["node", "index.js", "POST", "products", "New T-Shirt", "12.99", "clothing"]
const args = process.argv.slice(2);
const [method, resource, ...rest] = args;

// --- 1. Service Functions ---

// Obtener todos los productos
const getAllProducts = async () => {
  console.log("📦 Fetching all products...");
  const { data } = await api.get("/products");
  console.log("✅ All Products:");
  console.log(data);
};

// Obtener producto por ID
const getProductById = async (id) => {
  console.log(`🔍 Fetching product with ID: ${id}...`);
  const { data } = await api.get(`/products/${id}`);
  console.log("✅ Product Found:");
  console.log(data);
};

// Crear producto nuevo
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

// Actualizar producto
const updateProduct = async (id, title, price, category) => {
  if (!title || !price || !category) {
    console.log(
      "❌ Error: Debes proporcionar title, price y category para actualizar."
    );
    console.log(
      '👉 Ejemplo: npm run start PUT products/1 "Updated T-Shirt" 15.99 clothing'
    );
    return;
  }

  console.log(`📝 Updating product with ID: ${id}...`);
  const updatedProduct = { title, price: parseFloat(price), category };

  const { data } = await api.put(`/products/${id}`, updatedProduct);
  console.log("✅ Product Updated Successfully (simulation):");
  console.log(data);
};

// Eliminar producto
const deleteProduct = async (id) => {
  console.log(`🗑 Deleting product with ID: ${id}...`);
  const { data } = await api.delete(`/products/${id}`);
  console.log("✅ Product Deleted Successfully (simulation):");
  console.log(data);
};

// Ayuda de comandos
const showHelp = () => {
  console.log("❓ Command not recognized or incomplete.");
  console.log("Available commands:");
  console.log("  - npm run start GET products");
  console.log("  - npm run start GET products/<id>");
  console.log("  - npm run start POST products <title> <price> <category>");
  console.log("  - npm run start PUT products/<id> <title> <price> <category>");
  console.log("  - npm run start DELETE products/<id>");
};

// --- 2. Main Controller ---

const main = async () => {
  try {
    const [entityName, id] = (resource || "").split("/");

    switch (method) {
      case "GET":
        if (entityName === "products") {
          id ? await getProductById(id) : await getAllProducts();
        } else showHelp();
        break;

      case "POST":
        if (entityName === "products") {
          const [title, price, category] = rest;
          await createProduct(title, price, category);
        } else showHelp();
        break;

      case "PUT":
        if (entityName === "products" && id) {
          const [title, price, category] = rest;
          await updateProduct(id, title, price, category);
        } else showHelp();
        break;

      case "DELETE":
        if (entityName === "products" && id) {
          await deleteProduct(id);
        } else showHelp();
        break;

      default:
        showHelp();
    }
  } catch (error) {
    if (error.response) {
      console.error(
        `❌ API Error: ${error.response.status} - ${error.response.data}`
      );
    } else {
      console.error("❌ Unexpected Error:", error.message);
    }
  } finally {
    console.log("🏁 Execution finished.");
  }
};

main();
