FROM node:14

WORKDIR /ongaku/client

ADD . /ongaku/client

RUN npm install

EXPOSE 3000

CMD ["./node_modules/@craco/craco/bin/craco.js", "start"]