FROM node:6
MAINTAINER keith nielsen <nielsen.keith@gmail.com>
COPY package.json .babelrc /opt/snappit/
WORKDIR /opt/snappit
RUN npm install
COPY *.js /opt/snappit/
RUN npm run build
CMD node dist/app.js
