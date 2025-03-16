# Backend

## Descripción del Proyecto

 Es la API RESTful que gestiona la autenticación de usuarios y la administración de notas personales para la aplicación. Construida con Node.js y Express, esta API permite registrar e iniciar sesión a los usuarios, y gestionar (crear, leer, actualizar y eliminar) sus notas. La autenticación se realiza mediante JWT, y la base de datos MySQL.

## 🛠️ Stack

- Node.js
- Express
- MySQL
- JWT para autenticación
- ORM: Sequelize
- CORS configurado para permitir solicitudes desde el frontend

## Endpoints Principales

- `POST /auth/register` – Registro de usuario.
- `POST /auth/login` – Inicio de sesión (retorna token JWT).
- `POST /note/create_note/` – Crear una nueva nota.
- `GET /note/all/` – Obtener todas las notas del usuario autenticado.
- `PUT /note/put/:id"` – Actualizar una nota.
- `/note/delete/:id` – Eliminar una nota.

## Ejecución

1. **Instalar las dependencias**

    ```bash
    npm install
    ```

2. **Configurar las variables de entorno**

    Crea un archivo `.env` basado en `.env.example` y configura:
    - `PORT`
    - `DB_HOST`
    - `DB_USERNAME`
    - `DB_PASSWORD`
    - `DB_DATABASE`
    - `SECRET_JWT_SEED`
3. **Correr la aplicación**

    ```bash
    npm start
    ```

4. La API se ejecutará en `http://localhost:4000` (o el puerto configurado) y estará lista para recibir solicitudes desde el frontend.

