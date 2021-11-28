from config import *
from controllers.auth_controller import auth
from controllers.error_controller import err_controller

app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(err_controller)
