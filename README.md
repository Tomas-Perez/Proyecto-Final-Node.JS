# Proyecto-Final-Node.JS

API REST de Gestión de Productos con Express y Node.js

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
# Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo `.env` con los valores correspondientes para tu entorno.

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

## Documentación de la API

### Obtener todos los productos

- **GET** `/products`
- **Descripción:** Devuelve la lista de todos los productos.
- **Respuesta ejemplo:**

```json
[
  { "id": 1, "name": "Camiseta Deportiva", "price": 150 },
  { "id": 2, "name": "Zapatos Running", "price": 1200 },
  { "id": 3, "name": "Mochila Escolar", "price": 350 }
]
```

### Buscar productos por nombre o precio

- **GET** `/products/search?name=palabra`
- **Descripción:** Devuelve los productos cuyo nombre contiene la palabra indicada.
- **Parámetros:**
  - `name` (query, requerido): texto a buscar en el producto.
- **Ejemplo de uso:** `/products/search?name=camiseta`
- **Respuesta ejemplo:**

```json
[{ "id": 1, "name": "Camiseta Deportiva", "price": 150 }]
```

### Obtener producto por ID

- **GET** `/products/:id`
- **Descripción:** Devuelve un producto específico por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `/products/1`
- **Respuesta ejemplo:**

```json
{ "id": 1, "name": "Camiseta Deportiva", "price": 150 }
```

### Crear un producto

- **POST** `/products`
- **Descripción:** Crea un nuevo producto.
- **Body (JSON):**

```json
{ "name": "Nuevo Producto", "price": 999 }
```

- **Respuesta ejemplo:**

```json
{ "id": 6, "name": "Nuevo Producto", "price": 999 }
```

### Actualizar un producto (PUT)

- **PUT** `/products/:id`
- **Descripción:** Actualiza completamente un producto existente.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):**

```json
{ "name": "Producto Actualizado", "price": 500 }
```

- **Respuesta ejemplo:**

```json
{ "id": 1, "name": "Producto Actualizado", "price": 500 }
```

### Actualizar parcialmente un producto (PATCH)

- **PATCH** `/products/:id`
- **Descripción:** Actualiza parcialmente un producto existente.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):** Solo los campos que se desean actualizar

```json
{ "price": 600 }
```

- **Respuesta ejemplo:**

```json
{ "id": 1, "name": "Camiseta Deportiva", "price": 600 }
```

### Eliminar un producto

- **DELETE** `/products/:id`
- **Descripción:** Elimina un producto por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a eliminar.
- **Respuesta ejemplo:**

```json
{
    "message": "Producto eliminado",
    "product": {
        "price": 1500,
        "stock": 0,
        "name": "Labubu"
    }
}
```

## Códigos de estado

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `204` - No Content: Recurso eliminado exitosamente
- `400` - Bad Request: Datos de entrada inválidos
- `404` - Not Found: Recurso no encontrado

## Estructura del proyecto

```
src/
├── Controllers/
│   ├── auth.controller.js
│   └── products.controller.js
├── Models/
│   └── Product.js
├── Routes/
│   ├── auth.routes.js
│   └── products.routes.js
├── Middlewares/
│   └── authentication.js
├── Utils/
│   ├── filter.products.js
│   ├── token.generator.js
│   └── utils.js
├── Data/
    └── data.js
```

## Tecnologías utilizadas

- Node.js
- Express.js
- ES6 Modules

