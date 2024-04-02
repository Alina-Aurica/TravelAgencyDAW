from sqlalchemy import extract, func

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
    def find_all_reservations_by_id_destination_and_year_for_start_date_count_per_months(id_destination, year_start_date):
        return Reservation.query.with_entities(
            extract('month', Reservation.start_date).label('month'),
            func.count(Reservation.id).label('reservations_count')
        ).filter(
            Reservation.id_destination == id_destination,
            extract('year', Reservation.start_date) == year_start_date
        ).group_by(
            'month'
        ).order_by(
            'month'
        ).all()

    @staticmethod
    def find_all_reservations():
        return Reservation.query.all()

