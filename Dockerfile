FROM node:18-alpine

RUN mkdir -p /dados

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache python3 make g++ && \
    npm install && \
    apk del python3 make g++

COPY src/ ./src

ENV NODE_ENV=production

CMD ["npm", "start"]
