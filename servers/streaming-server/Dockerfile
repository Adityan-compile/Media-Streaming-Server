FROM ubuntu

RUN \
    apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y maven

EXPOSE 80

ENTRYPOINT ["mvn"]

CMD ["spring-boot:run"]