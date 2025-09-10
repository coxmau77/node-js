import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = join(__dirname, "public");

// Middleware to serve static files
app.use(express.static(PUBLIC_DIR));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
