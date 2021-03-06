FROM node:14.15.5-alpine3.10

RUN apk add --no-cache --virtual  git
WORKDIR /opt/ssi-am-accreditation-ui

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY angular.json angular.json
COPY src src
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json

EXPOSE 4200

ENTRYPOINT ["/bin/sh", "-c", "npm start"]
