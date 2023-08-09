FROM 132830644905.dkr.ecr.us-east-2.amazonaws.com/baseimage:node_16-alpine3.16 AS builder
WORKDIR /app
COPY ./yarn.lock .
COPY ./package.json .
RUN yarn install
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL
COPY . .
RUN apk --no-cache add curl
RUN yarn build