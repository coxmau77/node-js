import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js"; // Importar upload

const router = Router();

// Rutas para productos
router.get("/", productController.getAllProducts);
// Usar upload.single('image') para procesar la subida de un archivo en el campo 'image'
router.post("/", upload.single('image'), productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", upload.single('image'), productController.updateProduct);
router.patch("/:id/deactivate", productController.deactivateProduct); // Nueva ruta para desactivar
router.patch("/:id/activate", productController.activateProduct); // Nueva ruta para activar
router.delete("/:id", productController.deleteProduct);

export default router;

