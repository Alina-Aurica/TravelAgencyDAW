from application import db
from application.model.models import Destination


class DestinationRepository:
    @staticmethod
    def add_destination(destination):
        db.session.add(destination)
        db.session.commit()
        return destination

    @staticmethod
    def delete_destination(destination_id):
        destination = Destination.query.get(destination_id)
        if destination:
            db.session.delete(destination)
            db.session.commit()
            return destination
        return None

    @staticmethod
    def update_destination(destination_id, data):
        destination = Destination.query.get(destination_id)
        if destination:
            destination.name = data.get('name', destination.name)
            destination.description = data.get('description', destination.description)
            destination.location = data.get('location', destination.location)
            destination.numberOfRooms = data.get('numberOfRooms', destination.numberOfRooms)
            destination.numberOfSeatsAvailable = data.get('numberOfSeatsAvailable', destination.numberOfSeatsAvailable)
            destination.numberOfSeatsTotal = data.get('numberOfSeatsTotal', destination.numberOfSeatsTotal)
            destination.price = data.get('price', destination.price)
            destination.offer = data.get('offer', destination.offer)
            db.session.commit()
        return destination

    @staticmethod
    def find_destination_by_id(destination_id):
        return Destination.query.get(destination_id)

    @staticmethod
    def find_destination_by_name(destination_name):
        return Destination.query.filter_by(name=destination_name).first()

    @staticmethod
    def find_all_destinations_by_location(destination_location): # aici sa vad cum sa fac filtrarea
        search_pattern = f'%{destination_location}%'
        return Destination.query.filter(Destination.location.like(search_pattern)).all()

    @staticmethod
    def find_all_destinations_by_offer():
        return Destination.query.filter(Destination.offer != 0).all()

    @staticmethod
    def find_all_destinations():
        return Destination.query.all()
