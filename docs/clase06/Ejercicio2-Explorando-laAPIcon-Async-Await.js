import axios from "axios";

/**
 * Función para obtener personajes de Rick and Morty API con parámetros configurables
 * @param {Object} options - Opciones de configuración
 * @param {number} options.limit - Límite de personajes a mostrar (opcional)
 * @param {number} options.page - Página a consultar (opcional)
 * @param {string} options.name - Filtrar por nombre (opcional)
 * @param {string} options.status - Filtrar por estado (alive, dead, unknown)
 * @param {string} options.species - Filtrar por especie
 * @param {string} options.gender - Filtrar por género (female, male, genderless, unknown)
 * @returns {Promise<Array>} - Array de personajes
 */
const fetchCharacters = async (options = {}) => {
  const {
    limit = null,
    page = 1,
    name = "",
    status = "",
    species = "",
    gender = "",
  } = options;

  try {
    // Construir query parameters dinámicamente
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (name) params.append("name", name);
    if (status) params.append("status", status);
    if (species) params.append("species", species);
    if (gender) params.append("gender", gender);

    const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      timeout: 10000, // 10 segundos timeout
    });

    const allCharacters = response.data.results;
    const totalCharacters = response.data.info?.count || 0;
    const totalPages = response.data.info?.pages || 1;

    // Aplicar límite si se especificó
    const charactersToShow = limit
      ? allCharacters.slice(0, limit)
      : allCharacters;

    // Información de la consulta
    console.log("=== INFORMACIÓN DE LA CONSULTA ===");
    console.log("📊 Status:", response.status);
    console.log("🔢 Total de personajes disponibles:", totalCharacters);
    console.log("📄 Páginas totales:", totalPages);
    console.log("👤 Personajes mostrados:", charactersToShow.length);

    if (Object.keys(options).length > 0) {
      console.log("⚙️  Parámetros usados:", options);
    }

    // Mostrar información de los personajes
    if (charactersToShow.length > 0) {
      console.log("\n=== PERSONAJES ===");
      charactersToShow.forEach((character, index) => {
        console.log(
          `${index + 1}. ${character.name} - ${character.status} - ${
            character.species
          } - ${character.gender}`
        );
      });

      console.log("\n=== RESUMEN ===");
      console.log("⭐ Primer personaje:", charactersToShow[0]?.name);
      console.log(
        "🔚 Último personaje:",
        charactersToShow[charactersToShow.length - 1]?.name
      );
    } else {
      console.log("❌ No se encontraron personajes con los filtros aplicados");
    }

    return {
      characters: charactersToShow,
      info: response.data.info,
      total: totalCharacters,
      shown: charactersToShow.length,
      page: page,
      totalPages: totalPages,
    };
  } catch (error) {
    // Manejo específico de errores
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
        console.error("❌ Error del servidor:", errorMessage);
        throw new Error(errorMessage);
      } else if (error.request) {
        console.error("🌐 Error de red: No se recibió respuesta del servidor");
        throw new Error("Error de conexión. Verifica tu internet.");
      } else {
        console.error("⚙️ Error de configuración:", error.message);
        throw new Error("Error en la configuración de la solicitud");
      }
    } else {
      console.error("💥 Error inesperado:", error);
      throw new Error("Error inesperado al obtener los datos");
    }
  } finally {
    console.log("\n✅ Solicitud completada");
  }
};

// Ejemplos de uso:

// 1. Obtener todos los personajes (comportamiento por defecto)
const getAllCharacters = async () => {
  try {
    const result = await fetchCharacters();
    console.log("\n🎉 Todos los personajes obtenidos exitosamente");
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// 2. Obtener límite específico de personajes
const getLimitedCharacters = async (limit) => {
  try {
    const result = await fetchCharacters({ limit });
    console.log(`\n🎉 Primeros ${limit} personajes obtenidos`);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// 3. Filtrar por nombre
const searchCharactersByName = async (name) => {
  try {
    const result = await fetchCharacters({ name, limit: 10 });
    console.log(`\n🔍 Búsqueda por nombre: "${name}"`);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// 4. Filtrar por estado y especie
const filterCharacters = async (status, species, limit = 5) => {
  try {
    const result = await fetchCharacters({ status, species, limit });
    console.log(`\n🔍 Filtro: status=${status}, species=${species}`);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// 5. Paginación
const getCharactersByPage = async (page, limit = 10) => {
  try {
    const result = await fetchCharacters({ page, limit });
    console.log(`\n📄 Página ${page} obtenida`);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Ejecutar ejemplos
const runExamples = async () => {
  console.log("=== EJEMPLOS DE USO ===\n");

  // Ejemplo 1: Obtener primeros 5 personajes
  await getLimitedCharacters(5);

  // Esperar 1 segundo entre ejemplos
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Ejemplo 2: Buscar por nombre
  await searchCharactersByName("rick");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Ejemplo 3: Filtrar por estado vivo y especie humana
  await filterCharacters("alive", "human", 3);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Ejemplo 4: Obtener página 2
  await getCharactersByPage(2, 4);
};

// Ejecutar todos los ejemplos
// runExamples();

// // Uso básico
// fetchCharacters();

// // Con límite
// fetchCharacters({ limit: 5 });

// // Con filtros
// fetchCharacters({ name: "rick", status: "alive", limit: 10 });

// // Con paginación
// fetchCharacters({ page: 2, limit: 8 });

// Exportar la función para uso en otros módulos
export default fetchCharacters;
