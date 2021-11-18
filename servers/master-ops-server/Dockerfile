FROM ubuntu

COPY . /opt/source
WORKDIR /opt/source

RUN \
    apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y npm

EXPOSE 8080

RUN npm install --production

ENTRYPOINT ["npm"]

CMD ["start"]

