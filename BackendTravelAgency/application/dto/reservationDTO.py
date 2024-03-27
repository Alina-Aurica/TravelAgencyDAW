from datetime import date

from marshmallow import fields, Schema, validate


class ReservationDTO(Schema):
    id = fields.Integer(dump_only=True)
    id_user = fields.Integer(required=True, validate=validate.Range(min=1))
    id_destination = fields.Integer(required=True, validate=validate.Range(min=1))
    current_date = fields.Date(dump_only=True)
    start_date = fields.Date(required=True, validate=validate.Range(min=date.today()))
    end_date = fields.Date(required=True, validate=validate.Range(min=date.today()))
    # total_price = fields.Float(required=True, validate=validate.Range(min=0))
