FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV TIME_ZONE=America/Sao_Paulo
ENV SERVER_PORT=3000

WORKDIR /app

COPY src src
COPY package*.json ./

RUN apk --update add tzdata \
  && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo "America/Sao_Paulo" > /etc/timezone \
  && apk del tzdata

RUN npm install --location=global npm@latest

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]