FROM node  

WORKDIR /var/app/
COPY . /var/app/ 

RUN \
    npm i 

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV EXTEND_ESLINT=true

EXPOSE 3000

ENTRYPOINT [ "npm","start" ]
