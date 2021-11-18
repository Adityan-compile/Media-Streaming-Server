from flask import Flask
from flask_cors import CORS, cross_origin
from controllers.auth_controller import auth

from os import getenv

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth, url_prefix='/auth')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=getenv('PORT') or 80)
