from datetime import date

from application.dto.reservationDTO import ReservationDTO
from application.model.models import Reservation
from application.repository.destinationRepository import DestinationRepository
from application.repository.reservationRepository import ReservationRepository


def reservation_total_cost(start_date, end_date, price, offer):
    if not isinstance(start_date, date) or not isinstance(end_date, date):
        raise ValueError("start_date and end_date must be date objects")
    else:
        delta = end_date - start_date
        nights = delta.days - 1

    return (nights + 1) * (price - price * offer / 100)


class ReservationService:
    @staticmethod
    def create_reservation(**data): # ar mai trebui modificat, dar vom vedea
        reservation_DTO = ReservationDTO()
        reservation_data = reservation_DTO.load(data)

        destination = DestinationRepository.find_destination_by_id(reservation_data.get('id_destination'))
        destination_price = destination.get_price()
        destination_offer = destination.get_offer()
        total_price = reservation_total_cost(reservation_data.get('start_date'),
                                             reservation_data.get('end_date'),
                                             destination_price, destination_offer)
        reservation_new = Reservation(id_user=reservation_data.get('id_user'),
                                      id_destination=reservation_data.get('id_destination'),
                                      start_date=reservation_data.get('start_date'),
                                      end_date=reservation_data.get('end_date'),
                                      total_price=total_price
                                      )

        return ReservationRepository.add_reservation(reservation_new)

    @staticmethod
    def delete_reservation(user_id, destination_id):
        return ReservationRepository.delete_reservation(user_id, destination_id)

    @staticmethod
    def get_reservation_by_id(reservation_id):
        return ReservationRepository.find_reservation_by_id(reservation_id)

    @staticmethod
    def get_all_reservations_by_destination_id(id_destination):
        reservations = ReservationRepository.find_all_reservations_by_id_destination(id_destination)
        return [reservation.repr() for reservation in reservations]

    @staticmethod
    def get_all_reservations():
        reservations = ReservationRepository.find_all_reservations()
        return [reservation.repr() for reservation in reservations]

    # trebuie modificata
    @staticmethod
    def get_all_reservations_by_destination_id_and_year_count_per_months(destination_id, year):
        return ReservationRepository.find_all_reservations_by_id_destination_and_year_for_start_date_count_per_months(destination_id, year)
