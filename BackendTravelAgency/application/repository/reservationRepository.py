from application import db
from application.model.models import Reservation


class ReservationRepository:
    @staticmethod
    def add_reservation(reservation):
        db.session.add(reservation)
        db.session.commit()
        return reservation

    @staticmethod
    def delete_reservation(user_id, destination_id):
        reservation = Reservation.query.filter_by(id_user=user_id, id_destination=destination_id).first()
        if reservation:
            db.session.delete(reservation)
            db.session.commit()
            return reservation
        return None

    @staticmethod
    def find_reservation_by_id(reservation_id):
        return Reservation.query.get(reservation_id)

    @staticmethod
    def find_all_reservations_by_id_destination(id_destination):
        return Reservation.query.filter_by(id_destination=id_destination).all()

    @staticmethod
    def find_all_reservations():
        return Reservation.query.all()

