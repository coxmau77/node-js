import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Get authenticated user's profile
router.get("/profile", authenticateToken, userController.getProfile);

// Get all users
router.get("/", userController.getAllUsers);

// Search users by query params
router.get("/search", userController.searchUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

export default router;
