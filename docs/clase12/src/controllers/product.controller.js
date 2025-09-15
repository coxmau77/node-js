import { fileURLToPath } from "node:url";
import ProductService from "../services/product.service.js";
import fs from "node:fs/promises";
import path from "node:path";

export async function getAllProducts(req, res) {
  try {
    const products = await ProductService.getAllProducts();
    // Siempre devolver 200 OK. Si no hay productos, será un array vacío.
    res.status(200).json(products || []);
  } catch (error) {
    // Usar 500 para errores internos del servidor
    res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const productData = req.body;
    if (req.file) {
      // Construir una URL relativa para guardar en la BD
      productData.imageUrl = `/images/products/${req.file.filename}`;
    }
    const newProduct = await ProductService.createProduct(productData);
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
    const updateData = req.body;
    if (req.file) {
      updateData.imageUrl = `/images/products/${req.file.filename}`;
    }
    const updatedProduct = await ProductService.updateProduct(req.params.id, updateData);
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
    const productId = req.params.id;
    const product = await ProductService.getProductById(productId);

    if (product && product.imageUrl) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      // imagePath se construye relativo al directorio public
      const imagePath = path.join(__dirname, '..', '..', 'public', product.imageUrl);

      try {
        await fs.unlink(imagePath);
      } catch (unlinkError) {
        if (unlinkError.code !== 'ENOENT') {
          console.error("Error al eliminar el archivo de imagen:", unlinkError);
          // Considerar si se debe detener el proceso si la imagen no se puede eliminar
        }
      }
    }

    const deletedProduct = await ProductService.deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado para eliminar." });
    }

    res.status(200).json({ message: "Producto eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

