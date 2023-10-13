FROM 132830644905.dkr.ecr.us-east-2.amazonaws.com/baseimage:node_16-alpine3.16 AS builder
WORKDIR /app
COPY ./yarn.lock .
COPY ./package.json .
RUN yarn install
COPY . .
RUN apk --no-cache add curl
RUN yarn build