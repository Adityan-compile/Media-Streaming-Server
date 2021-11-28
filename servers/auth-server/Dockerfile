FROM python:3.8

WORKDIR /var/app/
COPY . /var/app/

EXPOSE 80

RUN pip3 install -r requirements.txt


ENTRYPOINT ["flask", "run", "--host", "0.0.0.0"]

