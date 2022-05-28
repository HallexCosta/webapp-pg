FROM node:16-alpine

ARG PORT
ARG AUX_DEBUG

ENV PORT=$PORT
ENV AUX_DEBUG=$AUX_DEBUG

WORKDIR /usr/webapp-pg/server

ADD *.json ./
ADD *.lock ./

RUN yarn install:ci

ADD . .

RUN yarn build

RUN rm -rf /usr/webapp-pg/server/node_modules

RUN yarn install:ci --production

# for heroku exec
RUN apk add --no-cache bash

# ADD ./.profile.d /usr/be-a-savior/server/.profile.d

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

EXPOSE 3333
EXPOSE 9229

#CMD bash heroku-exec.sh && yarn start
CMD ./start.sh
