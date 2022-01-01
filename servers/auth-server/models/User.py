from config import db
from utils.bcrypt import hash_password
import nanoid

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, name, password,id=""):
        if len(id) == 0:
           self.id = nanoid.generate(size=20)
        else:
            self.id = id
        self.name = name
        self.password = hash_password(password)
    
    def to_dict(self):
        result = {}
        for key in self.__mapper__.c.keys():
            if getattr(self, key) is not None:
                result[key] = str(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result