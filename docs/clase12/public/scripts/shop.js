document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const modal = document.getElementById("edit-modal");
  const closeButton = document.querySelector(".close-button");
  const editForm = document.getElementById("edit-form");

  let products = []; // Almacenar productos para acceder a ellos fácilmente

  const fetchAndRenderProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      products = response.data;

      productContainer.innerHTML = "";

      if (products.length === 0) {
        productContainer.innerHTML = `
          <div class="empty-products-message">
            <p>No hay productos disponibles en este momento.</p>
            <p>Puedes agregar productos en el <a href="/dashboard.html">dashboard</a>.</p>
          </div>
        `;
        return;
      }

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.dataset.productId = product._id;

        const imageUrl = product.imageUrl || "/images/placeholder.png";

        const priceFormatted = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.price);

        productCard.innerHTML = `
          <img src="${imageUrl}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description || "No hay descripción."}</p>
          <p><strong>Precio:</strong> ${priceFormatted}</p>
          <p><strong>Stock:</strong> ${product.stock} unidades</p>
          <div class="product-card-actions">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Eliminar</button>
          </div>
        `;
        productContainer.appendChild(productCard);
      });
    } catch (error) {
      console.error("Error al cargar productos:", error);
      productContainer.innerHTML = "<p>Error al cargar productos.</p>";
    }
  };

  const openEditModal = (productId) => {
    const product = products.find(p => p._id === productId);
    if (!product) return;

    const imageUrl = product.imageUrl || "/images/placeholder.png";
    const priceFormatted = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.price);

    document.getElementById("edit-product-id").value = product._id;
    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-description").value = product.description;
    document.getElementById("edit-price").value = priceFormatted;
    document.getElementById("edit-stock").value = product.stock;
    document.getElementById("edit-image-preview").src = imageUrl;

    modal.style.display = "block";
  };

  const closeEditModal = () => {
    modal.style.display = "none";
  };

  productContainer.addEventListener("click", async (event) => {
    const target = event.target;
    const productCard = target.closest(".product-card");
    if (!productCard) return;

    const productId = productCard.dataset.productId;

    if (target.classList.contains("btn-delete")) {
      if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        try {
          await axios.delete(`/api/products/${productId}`);
          fetchAndRenderProducts(); // Recargar productos
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          alert("No se pudo eliminar el producto.");
        }
      }
    }

    if (target.classList.contains("btn-edit")) {
      openEditModal(productId);
    }
  });

  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const productId = document.getElementById("edit-product-id").value;
    
    const priceValue = document.getElementById("edit-price").value;
    const formattedPrice = parseFloat(priceValue.replace(/\./g, '').replace(',', '.'));

    if (isNaN(formattedPrice)) {
      alert("El formato del precio no es válido. Use el formato 1.234,56");
      return;
    }

    const updatedData = {
      name: document.getElementById("edit-name").value,
      description: document.getElementById("edit-description").value,
      price: formattedPrice,
      stock: document.getElementById("edit-stock").value,
    };

    try {
      await axios.put(`/api/products/${productId}`, updatedData);
      closeEditModal();
      fetchAndRenderProducts(); // Recargar para ver los cambios
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  });

  closeButton.addEventListener("click", closeEditModal);

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeEditModal();
    }
  });

  fetchAndRenderProducts();
});
