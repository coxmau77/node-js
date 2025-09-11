import ProductService from "../services/product.service.js";

export async function getAllProducts(req, res) {
  try {
    const products = await ProductService.getAllProducts();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No hay productos disponibles." });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await ProductService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto desactivado exitosamente." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

