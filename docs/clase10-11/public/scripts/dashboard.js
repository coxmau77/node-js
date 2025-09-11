document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-button");
  const welcomeMessage = document.getElementById("welcome-message");
  const userEmail = document.getElementById("user-email");
  const searchForm = document.getElementById("search-form");
  const searchName = document.getElementById("search-name");
  const searchRole = document.getElementById("search-role");
  const searchResults = document.getElementById("search-results");
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  // Función para obtener y mostrar los datos del usuario
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      if (welcomeMessage) {
        welcomeMessage.textContent = `Bienvenido, ${user.name}`;
      }
      if (userEmail) {
        userEmail.textContent = `Email: ${user.email}`;
      }
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      // Si el token es inválido o expiró, el middleware devuelve 403
      // Redirigir al login
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    }
  };

  fetchUserProfile();

  // Manejar el cierre de sesión
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/index.html";
    });
  }

  // Manejar la búsqueda de usuarios
  if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = searchName.value;
      const role = searchRole.value;

      try {
        const response = await axios.get("/api/users/search", {
          params: { name, role },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        searchResults.textContent = JSON.stringify(response.data, null, 2);
      } catch (error) {
        console.error("Error al buscar usuarios:", error);
        let errorMessage = "Error al realizar la búsqueda.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        searchResults.textContent = errorMessage;
      }
    });
  }
});
