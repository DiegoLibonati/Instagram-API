FROM node:latest

WORKDIR /usr/src/app

COPY ./package*.json .

RUN yarn install

COPY . .

RUN yarn add nodemon

CMD ["yarn", "start"]