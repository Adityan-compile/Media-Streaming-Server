from os import stat_result
from flask import Blueprint, jsonify
from flask import request
from flask import make_response
from config import db, bcrypt
from models.User import User

auth = Blueprint('auth_controller', __name__)


@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.form
        found_user = User.query.filter_by(name=body.name).first()
        if found_user is not None:
            if bcrypt.check_password_hash(found_user.password, body.password):
                return jsonify(
                    {
                        "status": 200,
                        "message": "logged In"
                    }
                ), 200
        else:
            return jsonify({
                "status": 404,
                "message": "User not Found"
            })
    else:
        return 405


@auth.route('/setup', methods=['GET'])
def setup():
    return 'Hello', 200


@auth.route('/logout', methods=['GET'])
def logout():
    return 'Hello', 200


@auth.route('/users/add', methods=['GET'])
def add_user():
    return 'Hello', 200
