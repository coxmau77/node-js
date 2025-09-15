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

  // Manejar la creación de productos
  const createProductForm = document.getElementById("create-product-form");
  const createProductResult = document.getElementById("create-product-result");

  if (createProductForm) {
    createProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(createProductForm);
      const priceValue = formData.get('price');

      // Convertir el formato de precio a un número estándar
      // Elimina los puntos de miles y reemplaza la coma decimal por un punto
      const formattedPrice = parseFloat(priceValue.replace(/\./g, '').replace(',', '.'));

      if (isNaN(formattedPrice)) {
        alert("El formato del precio no es válido. Use el formato 1.234,56");
        return;
      }

      formData.set('price', formattedPrice);

      try {
        const response = await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        // Limpiar el contenedor de resultados anteriores
        const displayContainer = document.getElementById("product-display-container");
        displayContainer.innerHTML = ''; 

        // Crear y mostrar la tarjeta del nuevo producto
        const product = response.data;
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <h3>Producto Creado Exitosamente</h3>
          <img src="${product.imageUrl}" alt="Imagen de ${product.name}" style="max-width: 200px;"/>
          <p><strong>Nombre:</strong> ${product.name}</p>
          <p><strong>Descripción:</strong> ${product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> ${product.stock}</p>
          <p><strong>Categoría:</strong> ${product.category}</p>
        `;
        displayContainer.appendChild(productCard);

        createProductForm.reset(); // Limpiar el formulario
      } catch (error) {
        console.error("Error al crear el producto:", error);
        const displayContainer = document.getElementById("product-display-container");
        let errorMessage = "Error al crear el producto.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response && error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        displayContainer.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
      }
    });
  }
});
