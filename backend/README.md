# Portal Capacitaciones - Backend (Node.js + SQLite)

## Requisitos
- Node 18+
- npm
- (opcional) Docker

## Instalar
1. `cd backend`
2. `npm install`

## Inicializar DB con datos de prueba
`npm run seed`

Usuarios de prueba:
- admin / admin123  (role = admin)
- user / user123    (role = user)

## Ejecutar
`npm start`  (servidor en http://localhost:3000)

## Rutas principales
- POST /api/auth/login  { username, password }
- GET  /api/courses
- GET  /api/courses/:id
- POST /api/courses (admin)
- PUT  /api/courses/:id (admin)
- DELETE /api/courses/:id (admin)

- GET  /api/progress/me (auth)
- POST /api/progress/start/:courseId (auth)
- POST /api/progress/complete/:courseId (auth)