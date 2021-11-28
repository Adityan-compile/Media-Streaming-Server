from config import db
import nanoid


class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, name, password):
        self.id = nanoid.generate(size=20)
        self.name = name
        self.password = password
