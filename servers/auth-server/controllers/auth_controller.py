from flask import Blueprint, jsonify
from flask import request
from flask import make_response
from config import db, bcrypt
from models.User import User

auth = Blueprint('auth_controller', __name__)


@auth.route('/login', methods=['GET'])
def login():
    return 'Hello', 200


@auth.route('/setup', methods=['GET'])
def setup():
    return 'Hello', 200


@auth.route('/logout', methods=['GET'])
def logout():
    return 'Hello', 200


@auth.route('/users/add', methods=['GET'])
def add_user():
    return 'Hello', 200
