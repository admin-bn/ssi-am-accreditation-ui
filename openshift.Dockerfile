FROM node:alpine AS builder

WORKDIR /app

COPY . .

FROM nginx:alpine

ARG ENV

COPY --from=builder /app/dist/* /usr/share/nginx/html/

#COPY --from=builder /app/main-es2015.js /usr/share/nginx/html/

COPY --from=builder /app/default.conf /etc/nginx/conf.d/

RUN apk update && apk add bash


