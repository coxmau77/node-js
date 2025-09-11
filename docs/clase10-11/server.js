import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
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
// Enable CORS for all routes
const corsOptions = {
  // Para desarrollo, puedes permitir el origen de tu frontend
  // En producción, deberías tener una lista blanca de dominios permitidos
  origin: process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies
app.use(express.static(PUBLIC_DIR)); // To serve static files
app.use(
  "/scripts/axios.js",
  express.static(join(__dirname, "node_modules/axios/dist/axios.min.js"))
); // Serve axios
// Routes
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).sendFile(join(PUBLIC_DIR, "404.html")); // Custom 404 page
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
