from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .api.routes import api
from .api.models import db

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
JWTManager(app)
CORS(app)

app.register_blueprint(api, url_prefix="/api")

with app.app_context():
    db.create_all()
