// Lee los argumentos de la línea de comandos
const command = process.argv[2];
const value = process.argv[3];

if (command === "GET") {
  console.log(`Command received: ${command}`);
  console.log("Toma un dato");
} else if (command === "POST") {
  console.log(`Command received: ${command}`);
  console.log(`Recibimos ${value} satisfactoriamente`);
} else if (command === "PUT") {
  console.log(`Command received: ${command}`);
  console.log(`Modificamos el item con id: ${value} satisfactoriamente`);
} else if (command === "DELETE") {
  console.log(`Command received: ${command}`);
  console.log(`El item con el id: ${value} se eliminó con éxito`);
} else {
  console.log(`Command received: ${command}`);
  console.log("Comando no reconocido.");
}

// Probar la solución puedes ejecutar el archivo con el comando `npm run actividad`
//   Ahora puedes probar cada uno de los comandos en tu terminal. Aquí te dejo los ejemplos:
//   Para GET:
//    1 `npm run actividad GET`
//   Salida esperada: Toma un dato
//   ---
//   Para POST:
//    1 `npm run actividad POST "mis datos"`
//   Salida esperada: Recibimos mis datos satisfactoriamente
//   ---
//   Para PUT:
//    1 `npm run actividad PUT 123`
//   Salida esperada: Modificamos el item con id: 123 satisfactoriamente
//   ---
//   Para DELETE:
//    1 `npm run actividad DELETE 456`
//   Salida esperada: El item con el id: 456 se eliminó con éxito
