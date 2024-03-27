# from application import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
from datetime import date

from application.model.role import Role

db = SQLAlchemy()


class Destination(db.Model):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(80), nullable=False)
    numberOfRooms = db.Column(db.Integer, nullable=False)
    numberOfSeatsAvailable = db.Column(db.Integer, nullable=False)
    numberOfSeatsTotal = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    offer = db.Column(db.Float, default=0, nullable=False)

    def repr(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "numberOfRooms": self.numberOfRooms,
            "numberOfSeatsAvailable": self.numberOfSeatsAvailable,
            "numberOfSeatsTotal": self.numberOfSeatsTotal,
            "price": self.price,
            "offer": self.offer
        }

    def get_price(self):
        return self.price

    def get_offer(self):
        return self.offer


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    role = db.Column(Enum(Role, name='role', create_type=False), default=Role.CLIENT)

    def repr(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "role": self.role.name
        }


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    id_destination = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)
    current_date = db.Column(db.Date, nullable=False, default=date.today)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    def repr(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_destination": self.id_destination,
            "current_date": self.current_date,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "total_price": self.total_price
        }