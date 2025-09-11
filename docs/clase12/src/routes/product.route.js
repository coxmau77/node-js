import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js"; // Importar upload
import { authenticateToken } from "../middlewares/auth.middleware.js"; // Opcional, para proteger rutas

const router = Router();

// Rutas para productos
router.get("/", productController.getAllProducts);
// Usar upload.single('image') para procesar la subida de un archivo en el campo 'image'
router.post("/", upload.single('image'), productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", upload.single('image'), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
