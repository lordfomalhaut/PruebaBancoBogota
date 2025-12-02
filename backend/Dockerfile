FROM node:18-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar solo package.json
COPY package*.json ./

# Instalar solo dependencias en modo producción
RUN npm ci --only=production

# Copiar el código fuente
COPY src ./src

# Exponer el puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "src/app.js"]
