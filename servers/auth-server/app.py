from config import *
from controllers.auth_controller import auth
from controllers.error_controller import err_controller
from sqlalchemy.sql import text
import os 

from utils.migrate import init_migrations, run_migrations

migrations_dir_exists = os.path.isdir(os.path.join(os.getcwd(), "migrations"))

if(migrations_dir_exists):
    pass
else: 
    init_migrations()

run_migrations()

try:
    print("Executing Query SELECT 1")
    db.engine.execute(text("SELECT 1"))
    print("Query Executed Successfully")
    print("Database Connected !!")
except Exception as e:
    print("Database Connection Error \n")
    print(e)

app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(err_controller)
