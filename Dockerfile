FROM node:8-alpine

WORKDIR /usr/src/app

RUN apk add build-base autoconf libtool zlib automake

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build:server

EXPOSE 3000