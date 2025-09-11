# Plan de Estudios: Back-End Node.js - Talento Tech

## Descripción General

Curso cuatrimestral virtual que introduce al desarrollo web backend utilizando Node.js y Express.js, con foco en la creación de APIs RESTful, arquitectura escalable y seguridad. Está orientado a sentar las bases para perfiles full-stack.

---

## Detalle de Clases

### **CLASE 01: Bienvenida y Herramientas**

**Descripción:** Introducción al curso, su dinámica y configuración del entorno de desarrollo.

- Sobre Talento Tech
- Presentación del curso y dinámica
- Buenas prácticas para el curso
- Introducción a proyectos y ejercicios semanales
- Herramientas fundamentales y configuración del entorno
- Ejercicios

### **CLASE 02: Introducción a Node.js**

**Descripción:** Fundamentos de Node.js y diferencias con el entorno del navegador.

- ¿Qué es Node.js? Características principales
- Diferencias con JavaScript en el browser (Browser vs Runtime Environment)
- Modelo de single-threading vs multi-threading
- Cuestionario en Campus Virtual

### **CLASE 03: Funciones, Arrays y Methods**

**Descripción:** Profundización en conceptos clave de JavaScript moderno.

- Funciones tradicionales vs arrow functions
- HOF (Higher Order Functions)
- Declaración y métodos de arrays
- Template literals (backticks para strings dinámicos)
- Ejercicios

### **CLASE 04: Objetos y Operadores Avanzados**

**Descripción:** Manejo de objetos y operadores modernos de JavaScript.

- Literales de objetos
- Operadores avanzados: destructuring y spread operator
- Ejercicios
- Cuestionario en Campus Virtual
- Ruta de Avance

### **CLASE 05: Módulos y Gestores de Paquetes**

**Descripción:** Gestión de dependencias y módulos en Node.js.

- Gestores de paquetes (NPM)
- Instalación de paquetes, scripts y gestión de dependencias
- Inicio de un proyecto con Node.js y NPM
- Módulos nativos (path, fs, process)
- Módulos de terceros
- Gestión de rutas absolutas (dirname)
- Ejercicios

### **CLASE 06: Asincronismo**

**Descripción:** Manejo de operaciones asíncronas en JavaScript.

- Fundamentos de asincronismo
- Manejo de promesas (then, catch, finally)
- Async/await
- Uso de Fetch para consumir datos externos
- Ejercicios

### **CLASE 07: Servidores Web**

**Descripción:** Fundamentos de servidores y protocolo HTTP.

- Funcionamiento básico de servidores
- Relación cliente/servidor
- Protocolo HTTP
- URI: URL + URN
- Consignas de la Pre-entrega del Proyecto Final
- Cuestionario en Campus Virtual

### **CLASE 08: Patrones de Arquitectura**

**Descripción:** Introducción a patrones de arquitectura web.

- Métodos HTTP
- Códigos HTTP
- Patrones de arquitectura comunes
- MVC vs API Rest (diferencias y similitudes)
- Pre-Entrega de Proyecto Final
- Cuestionario en Campus Virtual

### **CLASE 09: Creando un Servidor Web**

**Descripción:** Implementación de servidores con Node.js nativo y Express.

- Servidor con Node.js nativo
- Express.js: instalación y configuración con Express Generator
- Desarrollo de un servidor con carpeta pública
- Introducción a middlewares
- Ejercicios

### **CLASE 10: Modelado de una API Rest**

**Descripción:** Estructura y división de responsabilidades en una API.

- Estructura de archivos y carpetas
- Capas: controladores, modelos, rutas, servicios
- División de responsabilidades
- Manejo de solicitudes y respuestas
- Ejercicios
- Cuestionario en Campus Virtual

### **CLASE 11: Request & Response**

**Descripción:** Profundización en la comunicación cliente-servidor.

- Rutas en detalle
- CORS (solicitudes entre dominios)
- Error Handle (404)
- Path y query params
- Uso de POSTMAN
- Ejercicios

### Ejemplo de Query Params

Además de los path params, tenemos otro tipo de parámetros que son igual de
importantes: los query params. A diferencia de los path params, los query params no
forman parte del "path" de la URL. En cambio, se envían como pares clave-valor después
de un signo de interrogación (?). Por ejemplo:
`/items?category=electronics&price=low`

En este caso, `category` y `price` son query params. Los query params son útiles para
enviar datos adicionales, como filtros o configuraciones, sin necesidad de modificar la
estructura de la ruta.

En Express, puedes acceder a ellos mediante `req.query`. Veamos un ejemplo:

```javascript
app.get('/items', (req, res) => {
  const category = req.query.category;
  const price = req.query.price;
  res.send(`Categoría: ${category}, Precio: ${price}`);
});
```

### Implementación de Búsqueda con Query Params

Para demostrar el uso de `query params` y mejorar la experiencia de usuario, hemos implementado una funcionalidad de búsqueda de usuarios en el dashboard. Esta implementación abarca tanto el backend como el frontend:

**Backend (API):**

-   **`docs/clase10-11/src/routes/user.route.js`**:
    -   Se añadió una nueva ruta `GET /api/users/search` que mapea a la función `searchUsers` del controlador.

-   **`docs/clase10-11/src/controllers/user.controller.js`**:
    -   Se implementó la función `searchUsers` para manejar las solicitudes de búsqueda.
    -   **Validación estricta:** Se añadió una validación que requiere que ambos campos (`name` y `role`) estén presentes y no vacíos para realizar la búsqueda. Si no se cumplen, se retorna un `status 400` con un mensaje específico.
    -   **Mensajes de error mejorados:** En caso de no encontrar usuarios, se retorna un `status 404` con un mensaje detallado que incluye los criterios de búsqueda utilizados.

-   **`docs/clase10-11/src/services/user.service.js`**:
    -   Se añadió la función `searchUsers` al `UserService`.
    -   Esta función construye una consulta a la base de datos utilizando la lógica `AND` para `name` (con búsqueda insensible a mayúsculas mediante `$regex`) y `role`.
    -   Se asegura de que solo los parámetros de búsqueda válidos (no vacíos) sean incluidos en la consulta a la base de datos.

**Frontend (Dashboard):**

-   **`docs/clase10-11/public/dashboard.html`**:
    -   Se añadió una sección de búsqueda con un formulario que incluye campos de entrada para `name` y `role`, y un área para mostrar los resultados.

-   **`docs/clase10-11/public/scripts/dashboard.js`**:
    -   Se añadió un `event listener` al formulario de búsqueda para capturar el envío.
    -   Se realiza una llamada `GET` al endpoint `/api/users/search` enviando los valores de `name` y `role` como `query parameters`.
    -   Se mejoró el manejo de errores para mostrar los mensajes específicos retornados por el backend, proporcionando una retroalimentación clara al usuario.

### **CLASE 12: Capa Lógica**

**Descripción:** Implementación de la lógica de aplicación en controladores y servicios.

- Controladores y servicios
- Manejo de la lógica de la aplicación
- Ejercicios
- Cuestionario en Campus Virtual
- Ruta de Avance

### **CLASE 13: Modelo de Datos y JSON**

**Descripción:** Trabajo con datos en formato JSON y modelado.

- Modelos de datos
- Formato JSON (métodos parse y stringify)
- Acceso a datos mediante archivos
- Ejercicios

### **CLASE 14: Datos en la Nube**

**Descripción:** Integración con servicios de base de datos en la nube (Firestore).

- Firebase/Firestore
- Creación de servicio de almacenamiento
- Consumo de Firestore desde la API
- Devolución de datos mediante arquitectura RESTful
- Ejercicios
- Cuestionario en Campus Virtual

### **CLASE 15: Autenticación y Autorización**

**Descripción:** Implementación de seguridad con JWT y middlewares.

- Introducción a la autenticación
- Token JWT (conceptos y uso)
- Middlewares para proteger rutas
- Buenas prácticas de seguridad
- Consignas del Proyecto Final
- Ejercicios

### **CLASE 16: Fin de la Cursada**

**Descripción:** Cierre del curso, despliegue y entrega final.

- Subida a producción
- Despedida y próximos pasos
- Entrega del Proyecto Final
- Ejercicios

---

## Proyecto Final Integrador

Desarrollo de una API REST para una tienda en línea con Node.js y Express.js, que incluye:

- Manejo de endpoints HTTP
- División de capas (controladores, servicios, modelos)
- Acceso a datos (JSON local o Firestore)
- Capa de autenticación JWT
- Despliegue en producción

---

**Modalidad:** Virtual  
**Duración:** 16 clases (1 cuatrimestre)  
**Certificación:** Microcredencial oficial del Ministerio de Educación de la Ciudad de Buenos Aires  
**Requisitos:** 70% de asistencia, cuestionarios aprobados y proyecto final integrador
