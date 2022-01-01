
from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from os import getenv
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from time import strftime

app = Flask(__name__)

@app.after_request
def after_request(response):
    timestamp = strftime('[%Y-%b-%d %H:%M]')
    app.logger.debug('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
    return response


DB_URI = \
    "postgresql://"+getenv('PG_USER')+":"+getenv('PG_PASSWORD') + \
    "@"+getenv('PG_HOST')+"/"+getenv("PG_DATABASE")


app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = getenv('SECRET_KEY')

CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app,db)
bcrypt = Bcrypt(app)