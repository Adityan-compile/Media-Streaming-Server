from flask import Flask
from flask_cors import CORS, cross_origin
from controllers.auth_controller import auth
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

app.register_blueprint(auth, url_prefix='/api/auth/')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=getenv('PORT') or 8080)
