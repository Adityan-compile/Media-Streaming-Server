import jwt
import datetime
import os

SECRET_KEY = os.getenv('SECRET_KEY')


def generate_access_token(id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=10),
            'iat': datetime.datetime.utcnow(),
            'sub': id
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e


def generate_refresh_token(id):
    try:
        payload = {
            'iat': datetime.datetime.utcnow(),
            'sub': id
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e


def verify_token(token):
    try:
        jwt.decode(token, SECRET_KEY)
        return True
    except Exception as e:
        return e
