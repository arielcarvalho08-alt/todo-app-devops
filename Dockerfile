FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia a estrutura de código e a nova pasta pública do frontend
COPY src/ ./src
COPY public/ ./public

ENV NODE_ENV=production

CMD ["npm", "start"]

