import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const productos = [
  { id: 1, name: "Producto A", price: 100 },
  { id: 2, name: "Producto B", price: 200 },
  { id: 3, name: "Producto C", price: 300 },
];

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/productos", (req, res) => {
  res.send(productos);
});

app.get("/producto/:id", (req, res) => {
  const { id } = req.params;
  const producto = productos.find((p) => p.id === parseInt(id));
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
