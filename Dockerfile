FROM node:8-alpine

WORKDIR /usr/src/app

RUN apk add build-base autoconf libtool zlib automake

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000