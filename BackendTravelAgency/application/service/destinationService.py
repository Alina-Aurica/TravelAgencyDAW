from application.dto.destinationDTO import DestinationDTO
from application.model.models import Destination
from application.repository.destinationRepository import DestinationRepository
from application.repository.reservationRepository import ReservationRepository


class DestinationService:
    @staticmethod
    def create_destination(**data):
        destination_DTO = DestinationDTO()
        destination_data = destination_DTO.load(data)

        destination_new = Destination(name=destination_data.get('name'),
                                      description=destination_data.get('description'),
                                      location=destination_data.get('location'),
                                      numberOfRooms=destination_data.get('numberOfRooms'),
                                      numberOfSeatsAvailable=destination_data.get('numberOfSeatsAvailable'),
                                      numberOfSeatsTotal=destination_data.get('numberOfSeatsTotal'),
                                      price=destination_data.get('price'),
                                      offer=destination_data.get('offer')
                                      )

        return DestinationRepository.add_destination(destination_new)

    @staticmethod
    def delete_destination(destination_id):
        return DestinationRepository.delete_destination(destination_id)

    @staticmethod
    def update_destination(destination_id, data):
        return DestinationRepository.update_destination(destination_id, data)

    @staticmethod
    def get_destination_by_id(destination_id):
        return DestinationRepository.find_destination_by_id(destination_id)

    @staticmethod
    def get_destination_by_name(destination_name):
        return DestinationRepository.find_destination_by_name(destination_name)

    @staticmethod
    def get_all_destinations_by_location(destination_location):
        destinations = DestinationRepository.find_all_destinations_by_location(destination_location)
        return [destination.repr() for destination in destinations]

    @staticmethod
    def get_all_destinations_by_offer():
        destinations = DestinationRepository.find_all_destinations_by_offer()
        return [destination.repr() for destination in destinations]

    @staticmethod
    def get_all_destinations():
        destinations = DestinationRepository.find_all_destinations()
        return [destination.repr() for destination in destinations]

    @staticmethod
    def get_all_destinations_available_between_start_date_and_end_date(start_date, end_date):
        reservations = ReservationRepository.find_all_reservations()
        destinations = DestinationRepository.find_all_destinations()
        reservations_result = []
        destinations_unblocked = []
        for reservation in reservations:
            if (reservation.start_date <= start_date and end_date <= reservation.end_date) or (
                    start_date <= reservation.start_date <= end_date) or (
                    start_date <= reservation.end_date <= end_date):
                reservations_result.append(reservation)

        for destination in destinations:
            ok = False
            for reservation in reservations_result:
                if reservation.id_destination == destination.id:
                    ok = True
            if not ok:
                destinations_unblocked.append(destination)

        return [destination.repr() for destination in destinations_unblocked]
