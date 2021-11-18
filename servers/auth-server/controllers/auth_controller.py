from flask import Blueprint
from flask import request
from flask import make_response
from flask import redirect

auth = Blueprint('auth_controller', __name__)


@auth.route('/')
def login():
    return 'Hello', 200
