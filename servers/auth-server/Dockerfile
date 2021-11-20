FROM python:3.8

WORKDIR /var/app/
COPY . /var/app/

RUN pip3 install -r requirements.txt

EXPOSE 80

ENV FLASK_ENV=development
ENV FLASK_APP=app.py

ENTRYPOINT ["flask", "run"]

