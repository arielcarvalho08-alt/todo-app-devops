FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instalação limpa e rápida, sem compilações nativas pesadas
RUN npm install

COPY src/ ./src

ENV NODE_ENV=production

CMD ["npm", "start"]