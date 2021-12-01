from flask import Blueprint, jsonify
from config import app

err_controller = Blueprint("error_controller", __name__)


@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "status": 404,
        "message": "The Requested Resource was not found on the Server"
    }), 404


@app.errorhandler(500)
def not_found(e):
    return jsonify({
        "status": 500,
        "message": "Internal Server Error"
    }), 500


@app.errorhandler(405)
def not_found(e):
    return jsonify({
        "status": 405,
        "message": "Method not Allowed"
    }), 405
