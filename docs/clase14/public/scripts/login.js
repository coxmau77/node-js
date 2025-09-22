const loginForm = document.getElementById('login-form');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await axios.post('/api/users/login', data);

    if (response.status === 200 && response.data.token) {
      // Guardamos el token en localStorage para mantener la sesión
      localStorage.setItem('token', response.data.token);

      // Mostramos un mensaje de éxito y redirigimos
      messageDiv.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
      messageDiv.style.color = 'green';

      // Redirigimos al dashboard después de un breve retraso
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 1000);
      
    } else {
      throw new Error('No se recibió el token de autenticación.');
    }

  } catch (error) {
    let errorMessage = 'Ocurrió un error al iniciar sesión.';
    if (error.response && error.response.data && (error.response.data.error || error.response.data.message)) {
      errorMessage = error.response.data.error || error.response.data.message;
    }
    messageDiv.textContent = errorMessage;
    messageDiv.style.color = 'red';
  }
});
