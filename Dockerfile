FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install --production
RUN yarn add tsc

COPY . .

RUN yarn build

CMD yarn run start
