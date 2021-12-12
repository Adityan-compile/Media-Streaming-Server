FROM node

WORKDIR /var/app/
COPY . /var/app

EXPOSE 80

RUN \
    apt install ffmpeg -y && \
    npm install && \
    npm install -g nodemon

ENTRYPOINT ["npm", "run", "dev"]

