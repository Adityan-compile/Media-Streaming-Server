FROM node  

WORKDIR /var/app/
COPY . /var/app/ 

RUN \
    npm i 

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 3000

ENTRYPOINT [ "npm","start" ]
