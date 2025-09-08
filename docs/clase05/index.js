import { add, subtract, multiply, divide, power, sqrt } from "./Math/index.js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

console.log(`La funcion suma: ${add(5, 3)}`); // Output: 8
console.log(`La funcion resta: ${subtract(5, 3)}`); // Output: 2
console.log(`La funcion multiplicacion: ${multiply(5, 3)}`); // Output: 15
// console.log(`La funcion division: ${divide(5, 0)}`); // Throws Error: Cannot divide by zero
console.log(`La funcion division: ${divide(10, 2)}`); // Output: 5
console.log(`La funcion potencia: ${power(2, 3)}`); // Output: 8
console.log(`La funcion raiz cuadrada: ${sqrt(16)}`); // Output: 4
// console.log(sqrt(-4)); // Throws Error: Cannot calculate square root of negative number
console.log("Hola mundo desde Node.js");

// const filePath = path.join(__dirname, "data", "example.txt");

// fs.readFile(filePath, "utf8", (error, data) => {
//   if (error) {
//     console.error("Error reading file:", error);
//     return;
//   }
//   console.log(`Document content file: ${data}`);
// });

// Uso de __dirname y __filename en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`El nombre del archivo actual "__filename" es: ${__filename}`);
console.log(`El nombre del directorio actual "__dirname" es: ${__dirname}`);

// Leer el documento de ejemplo
fs.readFile(
  path.join(__dirname, "data", "example.txt"),
  "utf8",
  (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return;
    }
    console.log(`Document content "data" file: ${data}`);
  }
);

// Process object: El módulo process es uno de los módulos nativos más importantes de Node.js, ya que permite interactuar con el proceso en ejecución. Una de sus propiedades clave es process.argv, un array que contiene los argumentos pasados al script desde la línea de comandos.
process.argv.forEach((val, index) => {
  console.log(`index [${index}]: val: ${val}`);
});

// Ejemplo de uso de process.argv
const args = process.argv.slice(2); // Ignorar los dos primeros elementos (ruta de Node.js y del script)
if (args.length > 0) {
  const name = args[0];
  console.log(`Hola, ${name}! Bienvenido a Node.js.`);
} else {
  console.log("Por favor, proporciona tu nombre como argumento.");
}

const argumentos = process.argv.slice(2);
if (argumentos[0] === "saludar") {
  const nombre = argumentos[1];
  console.log(`Hola, ${nombre}! Bienvenido a Node.js.`);
} else if (argumentos[0] === "despedir") {
  const nombre = argumentos[1];
  console.log(`Adiós, ${nombre}! Hasta luego.`);
} else {
  console.log("Comando no reconocido. Usa 'saludar' o 'despedir'.");
}
// Ejemplo de uso de process.env
console.log(
  `El valor de la variable de entorno "NODE_ENV" es: ${process.env.NODE_ENV}`
);
console.log(
  `El valor de la variable de entorno "HOME" es: ${process.env.HOME}`
);
console.log(
  `El valor de la variable de entorno "USER" es: ${process.env.USER}`
);
console.log(
  `El valor de la variable de entorno "SHELL" es: ${process.env.SHELL}`
);
