FROM node:8-alpine

WORKDIR /usr/src/app

RUN apk add build-base autoconf libtool zlib automake

COPY package*.json ./
COPY .npmrc ./

COPY client/package*.json ./client/
COPY client/.npmrc ./client/

RUN cd client && npm install

COPY . .

CMD [ "npm", "run", "dev"]
