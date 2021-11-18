FROM ubuntu

COPY . /var/www/source
WORKDIR /var/www/source

RUN \
    apt-get update && \
    apt-get install -y \
    nodejs \
    npm

EXPOSE 80

RUN npm install --production

ENTRYPOINT ["npm"]

CMD ["start"]

