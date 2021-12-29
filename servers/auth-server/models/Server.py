from config import db
import nanoid

class Server(db.Model):
    __tablename__ = 'server'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    tmdbKey = db.Column(db.String, nullable=False)
    videoQuality = db.Column(db.String, nullable=False)
    audioQuality = db.Column(db.String, nullable=False)

    def __init__(self, name, tmdbKey, videoQuality, audioQuality, id=""):
        if len(id) == 0:
           self.id = nanoid.generate(size=20)
        else:
            self.id = id
        self.name = name
        self.tmdbKey = tmdbKey
        self.videoQuality = videoQuality
        self.audioQuality = audioQuality
