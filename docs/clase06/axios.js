import axios from "axios";

async function fetchUser() {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchUser();
