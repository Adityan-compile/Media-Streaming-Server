'''
* Name: JWT Helpers 
'''

import jwt
from datetime import datetime, timedelta
import os
from functools import wraps
from flask import abort, request

ACCESS_TOKEN_KEY = os.getenv('ACCESS_TOKEN_KEY')
REFRESH_TOKEN_KEY = os.getenv('REFRESH_TOKEN_KEY')

'''
* Name: generate_access_token
* Description: Generate and Return Access Token with expiry of 1hr
* Params: id:String
* Return: String
'''
def generate_access_token(id):
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(hours=1),
            'iat': datetime.utcnow(),
            'payload': id,
        }
        return jwt.encode(
            payload,
            ACCESS_TOKEN_KEY or 'SECRET_KEY',
            algorithm='HS256',
            headers={
                "alg": "HS256",
                "typ": "JWT"
            }
        )
    except Exception as e:
        return e


'''
* Name: generate_refresh_token
* Description: Generate and Return Refresh Token with no expiry
* Params: id:String
* Return: String
'''
def generate_refresh_token(id):
    try:
        payload = {
            'iat': datetime.utcnow(),
            'payload': id
        }
        return jwt.encode(
            payload,
            REFRESH_TOKEN_KEY or "SECRET_KEY",
            algorithm='HS256',
            headers={
                "alg": "HS256",
                "typ": "JWT"
            }
        )
    except Exception as e:
        return e


'''
* Name: verify_token
* Description: Verify Access Token 
* Params: token:String
* Return: Object/Dict
'''
def verify_token(token, type='r'):
    try:
        decoded = jwt.decode(
            token, REFRESH_TOKEN_KEY if type == "r" else ACCESS_TOKEN_KEY)
        return decoded
    except Exception as e:
        raise e


'''
* Name: authenticate
* Description: Authenticate User 
* Params: Function
* Return: Function
'''
def authenticate(handler):
    @wraps(handler)
    def wrapper(*args, **kwargs):
        token = request.cookies.get('accessToken')
        if not token:
            abort(401)
        user = None

        try:
            user = verify_token(token, 'a')
        except Exception as e:
            abort(401)

        return handler(user, *args, **kwargs)

    return wrapper
