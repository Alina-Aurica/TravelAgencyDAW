from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from application.service.userService import UserService

auth_controller = Blueprint('auth_controller', __name__, url_prefix='/auth')


@auth_controller.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({'message': 'Missing email'}), 400
    if not password:
        return jsonify({'message': 'Missing password'}), 400

    user = UserService.get_user_by_email_and_password(email, password)
    if user:
        return jsonify(user.repr()), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 400


@auth_controller.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')

    if UserService.get_user_by_email(email):
        return jsonify({'message': 'User already registered'}), 400

    try:
        user = UserService.create_user(**data)
        return jsonify(user.repr()), 201
    except ValidationError as err:
        return jsonify(err.messages), 400
