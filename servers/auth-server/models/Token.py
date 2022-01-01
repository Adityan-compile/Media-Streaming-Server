from config import db
import nanoid


class Token(db.Model):
    __tablename__ = 'tokens'
    id = db.Column(db.String, primary_key=True)
    refresh_token = db.Column(db.String, nullable=False)

    def __init__(self, token):
        self.id = nanoid.generate(size=20)
        self.refresh_token = token

    def to_dict(self):
        result = {}
        for key in self.__mapper__.c.keys():
            if getattr(self, key) is not None:
                result[key] = str(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result