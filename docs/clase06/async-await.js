// function taskAsync(callback) {
//   setTimeout(function () {
//     console.log("Tarea asincrónica completada.");

//     callback();
//   }, 3000);
// }
// console.log("Inicio de la tarea.");

// taskAsync(function () {
//   console.log("Fin de la tarea.");
// });

let randomNumber = Math.random();

function taskAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (randomNumber < 0.5) {
        resolve(`Tarea asincrónica completada. random ${randomNumber}`);
      } else {
        reject(new Error(`Tarea asincrónica fallida. random ${randomNumber}`));
      }
    }, 3000);
  });
}

// const result = taskAsync();
// // console.log(result); // Promise { <pending> }

// console.log("Inicio de la tarea.");
// taskAsync()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error))
//   .finally(() => console.log("Fin de la tarea."));

async function executeAsyncTask() {
  console.log("Inicio de la tarea.");
  try {
    const result = await taskAsync();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Fin de la tarea.");
  }
}
executeAsyncTask();
