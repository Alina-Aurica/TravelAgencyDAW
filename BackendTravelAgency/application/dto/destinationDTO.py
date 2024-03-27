from marshmallow import Schema, fields, validate


class DestinationDTO(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(required=True, validate=validate.Length(min=1))
    location = fields.Str(required=True, validate=validate.Length(min=1))
    numberOfRooms = fields.Int(required=True, validate=validate.Range(min=1))
    numberOfSeatsAvailable = fields.Int(required=True, validate=validate.Range(min=1))
    numberOfSeatsTotal = fields.Int(required=True, validate=validate.Range(min=1))
    price = fields.Float(required=True, validate=validate.Range(min=1))
    offer = fields.Float(required=True, validate=validate.Range(min=0, max=100))