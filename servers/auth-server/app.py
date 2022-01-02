from controllers.auth_controller import auth
from controllers.error_controller import err_controller
from sqlalchemy.sql import text
from config import app, db 
from models.Token import Token
from models.User import User
from flask_migrate import upgrade

try:
    db.engine.execute(text("SELECT 1"))
    print("Database Connected !!")
except Exception as e:
    print("Database Connection Error \n")
    print(e)
with app.app_context():
    print("Running Migrations")
    upgrade()

app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(err_controller)
