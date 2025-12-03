#!/bin/sh
set -e

echo "Esperando a que PostgreSQL esté listo..."
node wait-for-postgres.js

echo "Ejecutando seed de la base de datos..."
node src/seed.js

echo "Iniciando servidor backend..."
exec node src/app.js

