'''
* Name: JWT Helpers 
'''

import jwt
from datetime import datetime, timedelta
import os

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
            'sub': id
        }
        return jwt.encode(
            payload,
            ACCESS_TOKEN_KEY,
            algorithm='HS256'
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
            'sub': id
        }
        return jwt.encode(
            payload,
            REFRESH_TOKEN_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e

'''
* Name: verify_token
* Description: Verify Access Token 
* Params: token:String
* Return: Object/Dict
'''
def verify_token(token):
    try:
        decoded = jwt.decode(token, ACCESS_TOKEN_KEY)
        return decoded
    except Exception as e:
        return e
