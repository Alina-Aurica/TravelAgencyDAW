from application.dto.userDTO import UserDTO
from application.model.role import Role
from application.model.models import User
from application.repository.userRepository import UserRepository


class UserService:
    @staticmethod
    def create_user(**data):
        user_DTO = UserDTO()
        user_data = user_DTO.load(data)

        user_new = User(name=user_data.get('name'),
                        email=user_data.get('email'),
                        password=user_data.get('password'),
                        role=user_data.get('role')
                        )

        if UserRepository.find_user_by_email(user_data.get('email')) is None:
            return UserRepository.add_user(user_new)
        return None

    @staticmethod
    def get_user_by_id(user_id):
        return UserRepository.find_user_by_id(user_id)

    @staticmethod
    def get_user_by_email(email):
        return UserRepository.find_user_by_email(email)

    @staticmethod
    def get_user_by_email_and_password(email, password):
        return UserRepository.find_user_by_email_and_password(email, password)