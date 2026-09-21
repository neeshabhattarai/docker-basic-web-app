FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=80

ENV MONGO_INITDB_ROOT_USERNAME=root

ENV MONGO_INITDB_ROOT_PASSWORD=password

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]