FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY . src/

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]