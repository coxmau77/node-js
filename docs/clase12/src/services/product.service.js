import Product from "../models/product.model.js";

class ProductService {
  async getAllProducts() {
    return Product.find({ isActive: true });
  }

  async createProduct(productData) {
    const newProduct = new Product(productData);
    return newProduct.save();
  }

  // Agrego métodos adicionales que son lógicos para un CRUD
  async getProductById(productId) {
    return Product.findById(productId);
  }

  async updateProduct(productId, updateData) {
    return Product.findByIdAndUpdate(productId, updateData, { new: true });
  }

  async deleteProduct(productId) {
    // Usamos una eliminación lógica en lugar de física
    return Product.findByIdAndUpdate(productId, { isActive: false }, { new: true });
  }
}

export default new ProductService();

