# API de Usuarios con Express.js

Este proyecto es una API simple para la gestión de usuarios, construida con Express.js y MongoDB. Proporciona endpoints para el registro de usuarios, inicio de sesión y operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Prerrequisitos

- Node.js
- npm
- MongoDB (corriendo en tu máquina local o en un servidor remoto)

## Instalación

1.  **Clona el repositorio** (o asegúrate de tener todos los archivos del proyecto).

2.  **Instala las dependencias:**
    Abre tu terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

3.  **Configura las Variables de Entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto y agrega las siguientes variables, reemplazando los valores de ejemplo con tu configuración real.
    ```env
    # Cadena de Conexión a MongoDB
    MONGODB_URI=mongodb://localhost:27017/express-static-db

    # Clave Secreta para JWT
    JWT_SECRET=tu_clave_secreta_de_jwt_super_segura_cambiala
    ```

## Ejecutar la Aplicación

Para iniciar el servidor en modo de desarrollo (con recarga automática al cambiar archivos), ejecuta:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`, y verás un mensaje de confirmación en la consola una vez que se conecte a MongoDB.

## Endpoints de la API para Postman

La URL base para todas las peticiones a la API es `http://localhost:3000/api/users`.

---

### 1. Registrar un Nuevo Usuario

-   **Método:** `POST`
-   **URL:** `http://localhost:3000/api/users/register`
-   **Body:** `raw` (JSON)
-   **Ejemplo de Body:**
    *Nota: `name`, `email`, `password` y `role` son obligatorios según el modelo.*

    ```json
    {
      "name": "Carlos Ruiz",
      "birthdate": "1990-05-15T00:00:00.000Z",
      "username": "carlosr",
      "email": "carlos.ruiz@example.com",
      "password": "mi-password-123",
      "role": "editor"
    }
    ```

### 2. Iniciar Sesión

-   **Método:** `POST`
-   **URL:** `http://localhost:3000/api/users/login`
-   **Body:** `raw` (JSON)
-   **Ejemplo de Body:**

    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
    *Recibirás los datos del usuario y un token JWT en la respuesta.*

### 3. Obtener Todos los Usuarios

-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/users/`

### 4. Obtener un Usuario por ID

-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/users/{idUsuario}`
    *(Reemplaza `{idUsuario}` con un ID de usuario real de tu base de datos.)*

### 5. Actualizar un Usuario

-   **Método:** `PUT`
-   **URL:** `http://localhost:3000/api/users/{idUsuario}`
-   **Body:** `raw` (JSON)
-   **Ejemplo de Body:**

    ```json
    {
      "name": "Johnathan Doe",
      "role": "admin"
    }
    ```

### 6. Eliminar un Usuario

-   **Método:** `DELETE`
-   **URL:** `http://localhost:3000/api/users/{idUsuario}`