import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js"; // Opcional, para proteger rutas

const router = Router();

// Rutas para productos
router.post("/", productController.createProduct); // Podríamos proteger esta ruta
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct); // Y esta
router.delete("/:id", productController.deleteProduct); // Y esta

export default router;
