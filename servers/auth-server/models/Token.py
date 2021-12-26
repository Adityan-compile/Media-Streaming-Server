from app import db
import nanoid


class Token(db.Model):
    __tablename__ = 'tokens'
    id = db.Column(db.String, primary_key=True)
    refresh_token = db.Column(db.String, nullable=False)

    def __init__(self, token):
        self.id = nanoid.generate(size=20)
        self.refresh_token = token
