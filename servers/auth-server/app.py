from controllers.auth_controller import auth
from controllers.error_controller import err_controller
from sqlalchemy.sql import text
import os
from flask_migrate import init, upgrade
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from os import getenv
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

app = Flask(__name__)

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


try:
    print("Executing Query SELECT 1")
    db.engine.execute(text("SELECT 1"))
    print("Query Executed Successfully")
    print("Database Connected !!")
except Exception as e:
    print("Database Connection Error \n")
    print(e)

migrations_dir_exists = os.path.isdir(os.path.join(os.getcwd(), "migrations"))

if(migrations_dir_exists):
    pass
else:
    print("Initializing Migrations")
    with app.app_context():
        init()

with app.app_context():
    print("Running Migrations")
    upgrade()

app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(err_controller)
