FROM node:18-alpine

# Cria o diretório onde o volume do banco vai persistir os dados
RUN mkdir -p /dados

WORKDIR /app

COPY package*.json ./

# Instala dependências necessárias para compilar o SQLite no Alpine Linux
RUN apk add --no-cache python3 make g++ && \
    npm install && \
    apk del python3 make g++

COPY src/ ./src

ENV NODE_ENV=production

CMD ["npm", "start"]
