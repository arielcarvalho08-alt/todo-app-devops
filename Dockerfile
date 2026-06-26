FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# Copia a estrutura de código e a nova pasta pública do frontend
COPY src/ ./src/
COPY public/ ./public/

EXPOSE 3000

CMD ["node", "src/index.js"]

