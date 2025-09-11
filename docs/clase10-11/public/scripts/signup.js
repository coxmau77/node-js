// Lógica para el formulario de registro de usuarios (signup)

const signupForm = document.getElementById("signup-form");
const messageDiv = document.getElementById("message");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  // Campos opcionales: si están vacíos, los eliminamos para no enviarlos al backend
  if (!data.birthdate) {
    delete data.birthdate;
  }
  if (!data.username) {
    delete data.username;
  }

  try {
    // Hacemos la petición POST a la API que creamos en el backend
    const response = await axios.post("/api/users/register", data);

    // Si el servidor responde con un código 201 (Created)
    if (response.status === 201) {
      messageDiv.textContent = "¡Usuario registrado exitosamente!";
      messageDiv.style.color = "green"; // Estilo para el mensaje de éxito
      signupForm.reset(); // Limpiamos el formulario
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "/login.html"; // Redirigimos a la página de login
    }
  } catch (error) {
    // Si hay un error, lo capturamos
    let errorMessage = "Ocurrió un error al registrar el usuario.";

    // Intentamos obtener un mensaje de error más específico de la respuesta de la API
    if (
      error.response &&
      error.response.data &&
      (error.response.data.error || error.response.data.message)
    ) {
      errorMessage = error.response.data.error || error.response.data.message;
    }

    messageDiv.textContent = errorMessage;
    messageDiv.style.color = "red"; // Estilo para el mensaje de error
  }
});
