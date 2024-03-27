from datetime import datetime, date

from flask import Blueprint, jsonify, request
from marshmallow import ValidationError

from application.service.destinationService import DestinationService

destination_controller = Blueprint('destinationController', __name__, url_prefix='/destination')


@destination_controller.route('/addDestination', methods=['POST'])
def add_destination():
    data = request.get_json()
    try:
        destination = DestinationService.create_destination(**data)
        return jsonify(destination.repr()), 201
    except ValidationError as err:
        return jsonify(err.messages), 400


@destination_controller.route('/updateDestination/<int:destination_id>', methods=['PUT'])
def update_destination(destination_id):
    data = request.get_json()
    destination = DestinationService.update_destination(destination_id, data)
    if destination:
        return jsonify(destination.repr()), 200
    return jsonify({'message': 'Error - destination not found'}), 404


@destination_controller.route('/deleteDestination/<int:destination_id>', methods=['DELETE'])
def delete_destination(destination_id):
    destination = DestinationService.delete_destination(destination_id)
    if destination:
        return jsonify(destination.repr()), 200
    return jsonify({'message': 'Error - destination not found'}), 404


@destination_controller.route('/getDestinationByID/<int:destination_id>', methods=['GET'])
def get_destination_by_id(destination_id):
    destination = DestinationService.get_destination_by_id(destination_id)
    return jsonify(destination.repr()), 200


@destination_controller.route('/getDestinationByName/<string:destination_name>', methods=['GET'])
def get_destination_by_name(destination_name):
    destination = DestinationService.get_destination_by_name(destination_name)
    return jsonify(destination.repr()), 200


@destination_controller.route('/allDestinations', methods=['GET'])
def get_all_destinations():
    destinations = DestinationService.get_all_destinations()
    return jsonify(destinations), 200


@destination_controller.route('/allDestinationsByLocation/<string:destination_location>', methods=['GET'])
def get_all_destinations_by_location(destination_location):
    destinations = DestinationService.get_all_destinations_by_location(destination_location)
    return jsonify(destinations), 200


@destination_controller.route('/allDestinationsByOffer', methods=['GET'])
def get_all_destinations_by_offer():
    destinations = DestinationService.get_all_destinations_by_offer()
    return jsonify(destinations), 200


@destination_controller.route('/allDestinationsAvailable/<string:start_date>/<string:end_date>', methods=['GET'])
def get_all_destinations_available(start_date, end_date):
    start_date = date.fromisoformat(start_date)
    end_date = date.fromisoformat(end_date)
    destinations = DestinationService.get_all_destinations_available_between_start_date_and_end_date(
        start_date=start_date, end_date=end_date)
    return jsonify(destinations), 200
