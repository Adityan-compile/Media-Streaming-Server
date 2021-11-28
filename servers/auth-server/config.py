from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from os import getenv
from flask_bcrypt import Bcrypt


app = Flask(__name__)

DB_URI = \
    "postgresql://"+getenv('PG_USER')+":"+getenv('PG_PASSWORD') + \
    "@"+getenv('PG_HOST')+"/"+getenv("PG_DATABASE")

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

app.secret_key = getenv('SECRET_KEY')

CORS(app)

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)
