'''
* Name: Auth Controller
* Description: Controller for Authentication Methods
'''

from flask import Blueprint, jsonify
from flask import request
from config import db, bcrypt
from models.User import User
from models.Token import Token
from utils.jwt import generate_access_token, generate_refresh_token, authenticate

auth = Blueprint('auth_controller', __name__)

'''
* Path: /users/count
* Method: GET
* Description: COunt the Number of Users in Database Table
'''
@auth.route('/users/count', methods=['GET'])
def get_users():
    user_count = User.query.count()
    return jsonify({
        "status": 200,
        "count": user_count,
    }), 200


'''
* Path: /setup
* Method: POST
* Description: Setup the First User 
'''
@auth.route('/setup', methods=['POST'])
def setup():
    body = request.form
    user_count = User.query.count()

    if user_count == 0:
        new_user = User(name=body['name'], password=body['password'])
        access_token = generate_access_token(new_user.id)
        refresh_token = generate_refresh_token(new_user.id)
        token_obj = Token(token=refresh_token)
        db.session.add_all([
            new_user,
            token_obj
        ])
        db.session.commit()
        return jsonify({
            "status": 200,
            "message": "Setup Success",
            "accessToken": access_token,
            "refreshToken": refresh_token
        }), 200
    else:
        return jsonify({
            "status": 406,
            "message": "Setup already Completed"
        }), 406


'''
* Path: /login
* Method: POST
* Description: Find User Compare Password and Login 
'''
@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.form
        print(body['name'])
        found_user = User.query.filter_by(name=body['name']).first()
        if found_user is not None:
            if bcrypt.check_password_hash(found_user.password, body['password']):
                access_token = generate_access_token(found_user.id)
                refresh_token = generate_refresh_token(found_user.id)
                token_obj = Token(token=refresh_token)
                db.session.add(token_obj)
                db.session.commit()
                return jsonify({
                    "status": 200,
                    "message": "Login Success",
                    "accessToken": access_token,
                    "refreshToken": refresh_token
                }), 200
        else:
            return jsonify({
                "status": 404,
                "message": "User not Found"
            })
    else:
        return jsonify({
            "status": 405,
            "message": "Method not Allowed"
        }), 405


'''
* Path: /logout
* Method: DELETE
* Description: Find Refresh Token and Delete Token
'''
@auth.route('/logout', methods=['DELETE'])
def logout():
    body = request.get_json()

    found_token = Token.query.filter_by(refresh_token=body['refreshToken'])

    if found_token is not None:
        db.session.delete(found_token)
        db.session.commit()
        return jsonify({
            "status": 205,
            "message": "Logout Success"
        }), 205
    else:
        return jsonify({
            "status": 400,
            "message": "Token to Delete not Found"
        }), 400


@auth.route('/users/add', methods=['GET'])
@authenticate
def add_user(user):
    return 'Hello', 200