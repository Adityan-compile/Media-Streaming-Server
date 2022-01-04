'''
* Name: Auth Controller
* Description: Controller for Authentication Methods
'''

from flask import Blueprint, jsonify
from flask import request
from config import db, bcrypt
from models.User import User
from models.Token import Token
from utils.jwt import generate_access_token, generate_refresh_token, authenticate, verify_token
from utils.server import save_server_settings
import json

auth = Blueprint('auth_controller', __name__)

'''
* Path: /users/count
* Method: GET
* Description: Count the Number of Users in Database Table
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
* Description: Setup the Server
'''


@auth.route('/setup', methods=['POST'])
def setup():
    body = request.get_json()
    user_count = User.query.count()
    if user_count == 0:
        new_user = User(name=body['name'], password=body['password'])
        server_info = dict(name=body['serverName'], tmdbKey=body['tmdbKey'],
                           videoQuality=body['videoQuality'], audioQuality=body['audioQuality'])
        try:
            save_server_settings(server_info)
            db.session.add(new_user)
            db.session.commit()
            new_user.password = None
            res = jsonify({
                "status": 200,
                "message": "Setup Success",
            })
            return res, 200
        except Exception as e:
            db.session.add(new_user)
            db.session.commit()
            res = jsonify({
                "status": 202,
                "message": "Request Partially Completed",
            })
            return res, 202
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
    body = request.get_json()
    found_user = User.query.filter_by(name=body['name']).first()
    if found_user is not None:
        if bcrypt.check_password_hash(found_user.password, body['password']):
            access_token = generate_access_token(found_user.id)
            refresh_token = generate_refresh_token(found_user.id)
            token_obj = Token(token=refresh_token.decode('utf8'))
            db.session.add(token_obj)
            db.session.commit()
            found_user.password = None
            res = jsonify({
                "status": 200,
                "message": "Login Success",
                "user": found_user.to_dict()
            })
            res.set_cookie('accessToken', access_token, max_age=60*60,
                           httponly=True, secure=True, samesite="Strict")
            res.set_cookie('refreshToken', refresh_token,
                           max_age=60*60, httponly=True, secure=True, samesite="Strict")
            return res, 200
    else:
        return jsonify({
            "status": 404,
            "message": "User not Found"
        })


'''
* Path: /logout
* Method: DELETE
* Description: Find Refresh Token and Delete Token
'''


@auth.route('/logout', methods=['DELETE'])
def logout():
    cookie = request.cookies['refreshToken']

    if cookie is None:
        return jsonify({
            "status": 400,
            "message": "Cookie Not Found"
        }), 400

    found_token = Token.query.filter_by(refresh_token=cookie).one()

    if found_token is not None:
        db.session.delete(found_token)
        db.session.commit()
        res = jsonify({
            "status": 205,
            "message": "Logout Success"
        })
        res.set_cookie('accessToken', "", max_age=0,
                       httponly=True, secure=True, samesite="Strict")
        res.set_cookie('refreshToken', "", max_age=0,
                       httponly=True, secure=True, samesite="Strict")
        return res, 205
    else:
        return jsonify({
            "status": 400,
            "message": "Token to Delete not Found"
        }), 400


'''
* Path: /tokens/access/verify
* Method: POST
* Description: Verify Access Token
'''


@auth.route("/tokens/access/verify", methods=['POST'])
def verify_access_token():
    secret_key = request.headers['SECRET_KEY']
    access_token = request.get_json().get('token', '')
    if(secret_key):
        if(access_token):
            decoded = verify_token(access_token, type="a")
            if(decoded):
                res = jsonify({
                    "status": 200,
                    "user": decoded
                })
                return res, 200

            res = jsonify({
                "status": 401,
                "message": "Unauthorized"
            })
            return res, 401
        else:
            res = jsonify({
                "status": 400,
                "message": "Invalid Access Token"
            })
            return res, 400
    else:
        res = jsonify({
            "status": 400,
            "message": "Invalid Secret Key"
        })
        return res, 400


'''
* Path: /tokens/refresh
* Method: POST
* Description: Find Refresh Token, Verify and Generate new Access Token
'''


@auth.route("/tokens/refresh", methods=['POST'])
def refresh_token():
    refresh_token = request.cookies.get("refreshToken")
    saved_token = Token.query.filter_by(refresh_token=refresh_token)
    if saved_token:
        decoded = verify_token(refresh_token)
        access_token = generate_access_token(decoded.payload)
        res = jsonify({
            "status": 200,
            "message": "Token Refreshed",
        })
        res.set_cookie('accessToken', access_token, max_age=60*60,
                       httponly=True, secure=True, samesite="Strict")
        return res, 200
    else:
        res = jsonify({
            "status": 400,
            "message": "Token not Found"
        })
        res.set_cookie('accessToken', "", max_age=0,
                       httponly=True, secure=True, samesite="Strict")
        res.set_cookie('refreshToken', "", max_age=0, path="/api/auth/tokens/refresh",
                       httponly=True, secure=True, samesite="Strict")
        return res, 401


'''
* Path: /users/add
* Method: POST
* Description: Authenticate Current User and Add new User
'''


@auth.route('/users/add', methods=['POST'])
@authenticate
def add_user(user):
    body = request.body
    new_user = User(name=body['name'], password=body['password'])
    db.session.add(new_user)
    db.session.commit()

    new_user.password = None

    res = jsonify({
        "status": 200,
        "message": "Setup Success",
        "user": new_user
    })

    return res, 200
