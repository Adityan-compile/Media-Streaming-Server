from flask import Blueprint, jsonify
from flask import request
from flask import make_response
from app import db, bcrypt
from models.User import User

auth = Blueprint('auth_controller', __name__)


@auth.route('/login')
def login():
    return 'Hello', 200


@auth.route('/setup')
def setup():
    return 'Hello', 200


@auth.route('/logout')
def logout():
    return 'Hello', 200


@auth.route('/users/add')
def add_user():
    return 'Hello', 200
