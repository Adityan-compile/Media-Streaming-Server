from config import db
from models.User import User
from models.Token import Token

def initDB():
    print("Dropping all Tables and Recreating")
    db.drop_all()
    db.create_all()
    db.session.commit()
