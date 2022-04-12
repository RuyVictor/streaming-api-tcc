FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build
RUN rm -rf ./src

EXPOSE 3333

ENTRYPOINT node ./build/server.js