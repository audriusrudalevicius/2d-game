FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm i
RUN npm prune

COPY ./dist /usr/src/app

EXPOSE 3000
CMD [ "node", "server.js" ]
