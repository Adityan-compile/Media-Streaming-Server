from flask import Blueprint, jsonify
from config import app

err_controller = Blueprint("error_controller", __name__)


@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "status": 404,
        "message": "The Requested Resource was not found on the Server"
    }), 404
