import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

export default router;
