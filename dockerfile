FROM node:latest

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - 
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' 
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app/web-ui-layer

COPY web-ui-layer/package-lock.json .
COPY web-ui-layer/package.json .

RUN npm i -g @angular/cli && npm i -D

ENV CHROME_BIN=/usr/bin/google-chrome 