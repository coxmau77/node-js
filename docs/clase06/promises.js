// Manejo de Promesas
// Vimos como Javascript maneja procesos asincrónicos internamente a pesar de contar un
// con solo hilo de ejecución o “Single Thread”. En la práctica conocer esto es determinante
// para saber cuando debemos crear funciones o procesos síncronos o asíncronos.
// En esta ocasión aprenderemos a crear estos procesos asíncronos y para ello contamos con
// diversas herramientas.
// Callbacks
// Un callback es una función que se pasa como argumento a otra función y se ejecuta cuando
// se completa la tarea. El siguiente ejemplo ilustra el uso de un callback:

function tareaAsincronica(callback) {
  setTimeout(() => {
    console.log("Tarea asincrónica completada");
    callback();
  }, 3000); // Simula una tarea que toma 3 segundos
}

function tareaSiguiente() {
  console.log("Siguiente tarea ejecutada Callbacks");
}

// tareaAsincronica(tareaSiguiente);

// function taskAsyn(callback) {
//   setTimeout(() => {
//     console.log(
//       "3. Tarea asincrónica completada Simula una tarea que toma 3 segundos"
//     );
//     callback();
//   }, 3000); // Simula una tarea que toma 3 segundos
// }

// console.log("1. Tarea iniciada");

// taskAsyn(() => {
//   console.log("4. Siguiente tarea ejecutada Callbacks");
// });

// console.log("2. Otra tarea iniciada");

// Promesas
// Una promesa es un objeto que representa la eventual finalización (o falla) de una operación
// asincrónica y su valor resultante. Las promesas tienen tres estados: pendiente, cumplida y
// rechazada. El siguiente ejemplo ilustra el uso de una promesa:
function tareaAsincronicaPromesa() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() < 0.5; // Simula éxito o fracaso aleatorio
      console.log(`Exito: ${exito}`);
      if (exito) {
        resolve("Tarea asincrónica completada con éxito " + exito);
        console.log(
          "Tarea asincrónica completada Simula una tarea que toma 3 segundos"
        );
      } else {
        reject(new Error("Error en la tarea asincrónica"));
      }
    }, 3000); // Simula una tarea que toma 3 segundos
  });
}

const result = tareaAsincronicaPromesa();
// console.log(result); // Promise { <pending> }

console.log("Tarea iniciada Promesas");
tareaAsincronicaPromesa()
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Tarea finalizada Promesas");
  });

// Async & Await
// El async/await es una forma más moderna de lograr el asincronismo en JavaScript que se
// basa en las promesas.
// ● El async es una palabra clave que se utiliza para definir una función asincrónica.
// ● El await es una palabra clave que se utiliza dentro de una función asincrónica para
// esperar la resolución de una promesa antes de continuar con la ejecución del
// código.
// Estas palabras claves se utilizan en reemplazo de los métodos then, catch y finally y
// siempre es recomendable utilizarlas dentro de un bloque de try/catch que nos permite
// ejecutar “cualquier” pieza de código dentro del try y capturar un fallo mediante el catch.
// Veamos cómo quedaría el ejemplo anterior trabajando con async/await:

async function ejecutarTareasAsincronas() {
  console.log("1. Otra tarea iniciada Async/Await");
  try {
    console.log("Tarea iniciada Async/Await");
    const resultado = await tareaAsincronicaPromesa();
    console.log("Resultado de la promesa:", resultado);
  } catch (error) {
    console.error("Error en la tarea:", error);
    // Manejo de errores
    // Aquí puedes realizar acciones adicionales, como registrar el error o intentar una recuperación.
  } finally {
    console.log("Tarea finalizada Async/Await");
  }
}

ejecutarTareasAsincronas();
