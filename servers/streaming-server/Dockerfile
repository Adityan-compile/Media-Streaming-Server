FROM ubuntu

RUN \
    apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get install -y maven

WORKDIR /var/app/
COPY . /var/app/

EXPOSE 80

ENTRYPOINT ["mvn", "spring-boot:run"]
# ENTRYPOINT ["mvn","org.springframework.boot:spring-boot-maven-plugin:run"]
