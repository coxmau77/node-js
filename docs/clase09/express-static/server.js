import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./src/routes/user.route.js";

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = join(__dirname, "public");

// Middlewares
app.use(express.json()); // To parse JSON bodies
app.use(express.static(PUBLIC_DIR)); // To serve static files

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});