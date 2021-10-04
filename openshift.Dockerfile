FROM node:alpine AS builder

WORKDIR /app

COPY ./ /app/
RUN pwd
RUN ls -l

FROM nginx:alpine

ARG ENV
COPY --from=builder ../app/dist/* /usr/share/nginx/html/
COPY ./ops/nginx.conf /etc/nginx/conf.d/default.conf

RUN apk update && apk add bash


