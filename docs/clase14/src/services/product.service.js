import Product from "../models/product.model.js";

class ProductService {
  async getAllProducts(filter = { isActive: true }) {
    return Product.find(filter);
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

  async deactivateProduct(productId) {
    return Product.findByIdAndUpdate(productId, { isActive: false }, { new: true });
  }

  async activateProduct(productId) {
    return Product.findByIdAndUpdate(productId, { isActive: true }, { new: true });
  }

  async deleteProduct(productId) {
    // Cambiamos a eliminación física
    return Product.findByIdAndDelete(productId);
  }
}

export default new ProductService();

