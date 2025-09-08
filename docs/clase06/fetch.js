// import axios from "axios";

// axios
//   .get("https://rickandmortyapi.com/api/character", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer token",
//     },
//   })
//   .then((response) => {
//     // console.log(response.data);
//     // Aquí puedes procesar los datos de la respuesta
//     console.log("*** Status:", response.status); // 200 OK
//     // console.log("*** Headers:", response.headers); // Información de los headers de la respuesta
//     // console.log("*** Config:", response.config.adapter); // Configuración de la solicitud realizada
//     // console.log("*** Request:", response.request.headers.Authorization); // Objeto de la solicitud realizada
//     console.log(`Response ${response.data.results.length} characters`);
//     console.log("First character:", response.data.results[0].name);
//     console.log(
//       "Last character:",
//       response.data.results[response.data.results.length - 1].name
//     );
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   })
//   .finally(() => {
//     console.log("Request completed");
//   });

import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

// Función para obtener los personajes

const fetchCharacters = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
    });

    // Procesar los datos de la respuesta
    console.log("*** Status:", response.status); // 200 OK
    console.log(`Response ${response.data.results.length} characters`);
    console.log("First character:", response.data.results[0].name);
    console.log(
      "Last character:",
      response.data.results[response.data.results.length - 1].name
    );

    return response.data;
  } catch (error) {
    // Manejo específico de diferentes tipos de errores
    if (axios.isAxiosError(error)) {
      // Error de Axios (respuesta HTTP con código de error)
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error del servidor:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("Error de red:", "No se recibió respuesta del servidor");
      } else {
        // Error al configurar la solicitud
        console.error("Error de configuración:", error.message);
      }
    } else {
      // Error inesperado
      console.error("Error inesperado:", error);
    }

    throw error; // Re-lanzar el error para que pueda ser manejado externamente si es necesario
  } finally {
    console.log("Request completed");
  }
};

// Ejecutar la función
fetchCharacters()
  .then((data) => {
    console.log(
      `Datos obtenidos exitosamente: ${
        data.results.length
      } personajes\n------------\n${data.results
        .map((character, index) => `${index + 1}) ${character.name}`)
        .join("\n")}`
    );
  })
  .catch((error) => {
    console.error("Error final al obtener personajes:", error.message);
  });
