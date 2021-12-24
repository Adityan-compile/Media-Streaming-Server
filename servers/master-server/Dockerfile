FROM node:latest

WORKDIR /var/app/
COPY . /var/app

EXPOSE 80

RUN \
    npm install && \
    npm install -g nodemon

ENTRYPOINT ["npm", "run", "dev"]

