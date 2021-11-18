FROM python

COPY . /var/www/source
WORKDIR /var/www/source

RUN pip3 install -r requirements.txt

EXPOSE 80

ENTRYPOINT [ "gunicorn", "app:app" ]

