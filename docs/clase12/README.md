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

---

## Endpoints de la API para Productos

La URL base para todas las peticiones a la API es `http://localhost:3000/api/products`.

### 1. Crear un Nuevo Producto

-   **Método:** `POST`
-   **URL:** `http://localhost:3000/api/products`
-   **Body:** `raw` (JSON)
-   **Ejemplo de Body:**

    ```json
    {
      "name": "Teclado Mecánico RGB",
      "description": "Teclado con switches azules y retroiluminación.",
      "price": 95,
      "stock": 150,
      "category": "Periféricos"
    }
    ```

### 2. Obtener Todos los Productos

-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/products`

### 3. Obtener un Producto por ID

-   **Método:** `GET`
-   **URL:** `http://localhost:3000/api/products/{idProducto}`
    *(Reemplaza `{idProducto}` con un ID de producto real de tu base de datos.)*

### 4. Actualizar un Producto (con o sin Imagen)

-   **Método:** `PUT`
-   **URL:** `http://localhost:3000/api/products/{idProducto}`
-   **Body:** `form-data`
-   **Instrucciones del Body:**
    Usa `form-data` para enviar los campos que deseas actualizar. Puedes incluir opcionalmente un nuevo archivo en el campo `image` para reemplazar la imagen existente.
    -   `price` (text): `99`
    -   `image` (file): *(Opcional) Selecciona una nueva imagen.*

### 5. Desactivar un Producto (Borrado Lógico)

-   **Método:** `DELETE`
-   **URL:** `http://localhost:3000/api/products/{idProducto}`

---

## Guía de Implementación del Frontend para Productos

Esta sección documenta el proceso de construcción de la interfaz de usuario para la gestión de productos en la página `shop.html`.

### 1. Visualización de Productos

-   **Objetivo:** Mostrar todos los productos disponibles en la página `shop.html`.
-   **Implementación:**
    1.  Se creó un script en `public/scripts/shop.js`.
    2.  Este script utiliza `axios` para hacer una petición `GET` al endpoint `/api/products` cuando la página carga.
    3.  Para cada producto recibido, se genera dinámicamente una "tarjeta de producto" (product card) en HTML y se inyecta en el `<div id="product-container">`.
    4.  Se añadieron estilos en `public/stylesheets/styles.css` para dar un formato de grilla a las tarjetas.

### 2. Implementación de Borrado Físico

-   **Objetivo:** Permitir la eliminación de un producto desde la interfaz, incluyendo su imagen en el servidor.
-   **Implementación:**
    1.  **Frontend (`shop.js`):**
        -   Se añadió un botón "Eliminar" a cada tarjeta de producto.
        -   Al hacer clic, se pide confirmación al usuario.
        -   Si se confirma, se envía una petición `DELETE` con `axios` al endpoint `/api/products/:id`.
        -   La tarjeta del producto se elimina del DOM para reflejar el cambio instantáneamente.
    2.  **Backend (`product.controller.js` y `product.service.js`):**
        -   Se modificó el servicio para usar `findByIdAndDelete`, cambiando el borrado de lógico a físico.
        -   En el controlador, antes de llamar al servicio, se obtiene la ruta de la imagen del producto (`imageUrl`).
        -   Se utiliza el módulo `fs` de Node.js para eliminar el archivo de imagen correspondiente del directorio `public/images/products`.
        -   Se corrigió un bug en la construcción de la ruta del archivo para asegurar la compatibilidad con Windows.

### 3. Implementación de Edición con Modal

-   **Objetivo:** Permitir la edición de los datos de un producto a través de una ventana modal.
-   **Implementación:**
    1.  **HTML (`shop.html`):** Se añadió la estructura HTML para un modal, inicialmente oculto. Este modal contiene un formulario de edición.
    2.  **CSS (`styles.css`):** Se agregaron estilos para la apariencia y el comportamiento del modal (superposición, centrado, etc.).
    3.  **JavaScript (`shop.js`):**
        -   Al hacer clic en el botón "Editar", se obtienen los datos del producto correspondiente.
        -   Se rellenan los campos del formulario en el modal con estos datos y se muestra el modal.
        -   Al enviar el formulario, se recogen los datos actualizados y se envía una petición `PUT` con `axios` al endpoint `/api/products/:id`.
        -   Tras una actualización exitosa, el modal se cierra y la lista de productos se recarga para mostrar los cambios.

### 4. Mejoras de Usabilidad y Formato

-   **Formato de Precios:**
    -   **Entrada:** Se modificaron los formularios de creación (`dashboard.html`) y edición (`shop.html`) para que el campo de precio sea de tipo `text`. Esto permite al usuario introducir precios con formato de miles y comas decimales (ej: "2.999,99").
    -   **Procesamiento:** En los scripts (`dashboard.js` y `shop.js`), se añadió lógica para convertir este string formateado a un número estándar antes de enviarlo al backend.
    -   **Visualización:** En `shop.js`, se utiliza `Intl.NumberFormat` para mostrar los precios en las tarjetas de producto con el formato localizado (`$2.999,99`).

-   **Campo de Imagen Obligatorio:**
    -   Se añadió el atributo `required` al campo de subida de imagen en `dashboard.html` para asegurar que cada nuevo producto tenga una imagen.

-   **Mensaje de Lista Vacía:**
    -   **Backend:** Se corrigió el controlador `getAllProducts` para que devuelva un `200 OK` con un array vacío `[]` si no hay productos, en lugar de un `404 Not Found`.
    -   **Frontend:** Se mejoró el mensaje en `shop.js` que se muestra cuando no hay productos. Ahora, en lugar de un error, se muestra: "No hay productos disponibles en este momento. Puedes agregar productos en el dashboard", con un enlace directo al dashboard.