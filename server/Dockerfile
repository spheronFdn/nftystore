FROM node:16-alpine

WORKDIR /app

COPY ./server/package*.json ./

RUN npm ci

COPY ./server .

RUN npm run build

EXPOSE 8080

CMD ["node", "./build/index.js"]
