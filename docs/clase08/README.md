# Pre-Entrega de Proyecto

Tu desafío es integrar todo lo aprendido en un único programa. Queremos ver cómo manejas estructuras, APIs y lógica dinámica. El objetivo es construir una herramienta funcional para manejar productos de una tienda en línea desde la terminal. ¿Estás listo para el reto?

## Requerimientos del Proyecto

### Requerimiento #1: Configuración Inicial

- Crea un directorio donde alojarás tu proyecto e incluye un archivo index.js como punto de entrada.
- Inicia Node.js y configura npm usando el comando npm init -y.
- Agrega la propiedad "type": "module" en el archivo package.json para habilitar ESModules.
- Configura un script llamado start para ejecutar el programa con el comando npm run start.

Sabrina señala: “Este será el corazón de tu proyecto. Queremos un entorno limpio y profesional, como si estuvieras trabajando en un proyecto real”.

### Requerimiento #2: Lógica de Gestión de Productos

Con la base del proyecto lista, ahora necesitamos implementar las funcionalidades principales usando la API FakeStore. El sistema debe ser capaz de interpretar comandos ingresados en la terminal y ejecutar las siguientes acciones:

#### A) Consultar Todos los Productos:

Si ejecutas `npm run start GET products`, el programa debe realizar una petición asíncrona a la API y devolver la lista completa de productos en la consola.

Ejemplo: `npm run start GET products`

#### B) Consultar un Producto Específico:

Si ejecutas `npm run start GET products/<productId>`, el programa debe obtener y mostrar el producto correspondiente al productId indicado.Ejemplo: `npm run start GET products/15`

#### C) Crear un Producto Nuevo:

Si ejecutas `npm run start POST products <title> <price> <category>`, el programa debe enviar una petición POST a la API para agregar un nuevo producto con los datos proporcionados (title, price, category) y devolver el resultado en la consola.

Ejemplo: `npm run start POST products T-Shirt-Rex 300 remeras`

#### D) Eliminar un Producto:

Si ejecutas `npm run start DELETE products/<productId>`, el programa debe enviar una petición DELETE para eliminar el producto correspondiente al productId y devolver la respuesta en la consola.

Ejemplo: `npm run start DELETE products/7`

---

## Tips de Desarrollo

- Usa process.argv para capturar y procesar los comandos ingresados.
- Implementa fetch para interactuar con la API de FakeStore (consulta su documentación para más detalles).
- Aprovecha el uso de destructuring y spread para manipular los datos.
- Utiliza métodos de arrays y strings para separar cadenas de texto y conjuntos de información y aprovechar solo lo que necesites.

### Conclusión

Matías finaliza: “Este desafío no solo mide tus habilidades técnicas, sino también tu capacidad para organizarte, resolver problemas y crear soluciones escalables. Si logras superar este reto, estaremos más que seguros de que estás listo para unirte a TechLab” ¿Aceptas el desafío?
