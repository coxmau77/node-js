// Destructuring en Arrays
// Se utiliza para desempaquetar valores basados en su posición en el array:
const numeros = [1, 2, 3];
const [primero, segundo, tercero] = numeros;
console.log(primero); // 1
console.log(segundo); // 2
console.log(tercero); // 3

const nombres = ["Alice", "Bob", "Charlie"];
const [nombre1, nombre2, nombre3] = nombres;
console.log(nombre1); // Alice
console.log(nombre2); // Bob
console.log(nombre3); // Charlie

// Destructuring en objetos
// Se utiliza para extraer propiedades de un objeto y asignarlas a variables:
const persona = { nombre: "Alice", edad: 30, ciudad: "Wonderland" };
const { nombre, edad, ciudad } = persona;
console.log(nombre); // Alice
console.log(edad); // 30
console.log(ciudad); // Wonderland

// Ejemplo ampliado en destructuring.md
