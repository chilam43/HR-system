FROM --platform=linux/amd64 node:lts-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD cd dist && \
    npx knex migrate:latest &&\
    npx knex seed:run &&\
    cd .. && \
    node dist/main.js