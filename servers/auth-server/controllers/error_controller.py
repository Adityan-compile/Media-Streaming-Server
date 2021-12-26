'''
* Name: error_controller
'''

from flask import Blueprint, jsonify
from app import app

err_controller = Blueprint("error_controller", __name__)

'''
* Name: not_found
* Type: Error Handler
* Code: 404
* Desc: Catch and handle 404 errors
'''
@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "status": 404,
        "message": "The Requested Resource was not found on the Server"
    }), 404

'''
* Name: internal_error
* Type: Error Handler
* Code: 500
* Desc: Catch and handle 500 errors
'''
@app.errorhandler(500)
def internal_error(e):
    return jsonify({
        "status": 500,
        "message": "Internal Server Error"
    }), 500

'''
* Name: method_error
* Type: Error Handler
* Code: 405
* Desc: Catch and handle 405 errors
'''
@app.errorhandler(405)
def method_error(e):
    return jsonify({
        "status": 405,
        "message": "Method not Allowed"
    }), 405
