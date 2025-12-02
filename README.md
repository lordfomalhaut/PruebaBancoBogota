
## Requisitos

- Node.js 18 o superior
- npm
- PostgreSQL (para la base de datos)

## Instalación

### 1. Backend

```bash
cd backend
npm install
```

### 2. Frontend

```bash
cd frontend
npm install
```

## Configuración

### Backend

Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=tu_usuario
PG_PASSWORD=tu_contraseña
PG_DATABASE=nombre_base_datos
PORT=3000
JWT_SECRET=tu_secret_key_segura
```

### Base de Datos

Asegúrate de tener PostgreSQL corriendo y crea la base de datos:

```sql
CREATE DATABASE nombre_base_datos;
```

## Ejecución

### 1. Inicializar Base de Datos

Primero, ejecuta el script de seed para crear las tablas y datos de prueba:

```bash
cd backend
npm run seed
```

Esto creará:
- Tablas necesarias (users, courses, progress)
- Usuarios de prueba:
  - **Admin**: `admin` / `admin123`
  - **Usuario**: `user` / `user123`

### 2. Iniciar Backend

En una terminal:

```bash
cd backend
npm start
```

El servidor estará disponible en `http://localhost:3000`

### 3. Iniciar Frontend

En otra terminal:

```bash
cd frontend
npm start
```

La aplicación estará disponible en `http://localhost:4200`


## Funcionalidades

- **Autenticación**: Login con JWT
- **Roles**: Admin y Usuario
- **Cursos**: Listar, crear, editar, eliminar (admin)
- **Progreso**: Iniciar y completar cursos
- **Dashboard**: Vista principal con acceso rápido

## Usuarios de Prueba

- **Administrador**:
  - Usuario: `admin`
  - Contraseña: `admin123`
  - Permisos: Crear, editar y eliminar cursos

- **Usuario Regular**:
  - Usuario: `user`
  - Contraseña: `user123`
  - Permisos: Ver cursos y gestionar su progreso

## Comandos Útiles

### Backend
- `npm start` - Inicia el servidor
- `npm run dev` - Inicia con nodemon (auto-reload)
- `npm run seed` - Ejecuta el seed de la base de datos

### Frontend
- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm test` - Ejecuta las pruebas

## Notas

- El frontend se conecta automáticamente a `http://localhost:3000`

