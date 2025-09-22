// Utiliza la API pública de Rick and Morty (https://rickandmortyapi.com/api/character)
// para obtener la información de los primeros 5 personajes empleando axios.
//
// Implementa una función asíncrona con async/await para realizar la petición a la API.
// Asegúrate de manejar posibles errores de forma adecuada utilizando un bloque try/catch.
//
// El código debe ser limpio, claro, fácil de comprender y estar bien estructurado.

import axios from "axios";

const getCharacters = async () => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};

const main = async () => {
  const characters = await getCharacters();
  const limit = 5;
  if (characters) {
    console.log(`Successfully fetched first ${limit} characters:`);
    for (let i = 0; i < limit; i++) {
      console.log(`- ${characters[i].name}`);
    }
  }
};

main();
