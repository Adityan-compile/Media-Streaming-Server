from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database
from models.User import User
from models.Server import Server
from models.Token import Token
from config import db
from flask_migrate import init,upgrade

def init_migrations():
    print("Initializing Migrations")
    return init()

def run_migrations():
    print("Running Migrations")
    return upgrade()

