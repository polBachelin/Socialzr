FROM node:lts-alpine3.12

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
#COPY . /app
#RUN npm run build