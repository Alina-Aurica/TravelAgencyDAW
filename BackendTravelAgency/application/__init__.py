from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from application.model.models import db
from config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    from application.model import models

    db.init_app(app)
    with app.app_context():
        db.create_all()

    CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

    from .controller.userController import user_controller
    app.register_blueprint(user_controller)
    from .controller.destinationController import destination_controller
    app.register_blueprint(destination_controller)
    from .controller.reservationController import reservation_controller
    app.register_blueprint(reservation_controller)
    from .controller.authController import auth_controller
    app.register_blueprint(auth_controller)

    return app
