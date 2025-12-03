FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY wait-for-postgres.js ./
COPY start.sh ./

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]
