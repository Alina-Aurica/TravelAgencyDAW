from marshmallow import fields, Schema, validate

from application.model.role import Role


class UserDTO(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Regexp('^[a-zA-Z0-9_. +-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'))
    password = fields.Str(required=True, validate=validate.Length(min=5))
    role = fields.Enum(Role, by_value=True)  # posibil sa fiu nevoita sa o schimb
