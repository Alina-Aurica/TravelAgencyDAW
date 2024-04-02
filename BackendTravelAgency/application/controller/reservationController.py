from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from application.service.reservationService import ReservationService

reservation_controller = Blueprint('reservationController', __name__, url_prefix='/reservation')


@reservation_controller.route('/addReservation', methods=['POST'])
def add_reservation():
    data = request.get_json()
    try:
        reservation = ReservationService.create_reservation(**data)
        return jsonify(reservation.repr()), 201
    except ValidationError as err:
        return jsonify(err.messages), 400


@reservation_controller.route('/deleteReservation/<int:user_id>/<int:destination_id>', methods=['DELETE'])
def delete_reservation(user_id, destination_id):
    reservation = ReservationService.delete_reservation(user_id, destination_id)
    if reservation:
        return jsonify(reservation.repr()), 200
    return jsonify({'message': 'Error - destination not found'}), 404


@reservation_controller.route('/getReservationById/<int:reservation_id>', methods=['GET'])
def get_reservation_by_id(reservation_id):
    reservation = ReservationService.get_reservation_by_id(reservation_id)
    return jsonify(reservation.repr()), 200


@reservation_controller.route('/allReservations', methods=['GET'])
def get_all_reservations():
    reservations = ReservationService.get_all_reservations()
    return jsonify(reservations), 200


@reservation_controller.route('/allReservationsByDestinationId/<int:destination_id>', methods=['GET'])
def get_all_reservations_by_destination_id(destination_id):
    reservations = ReservationService.get_all_reservations_by_destination_id(destination_id)
    return jsonify(reservations), 200


@reservation_controller.route('/allReservationsByDestinationIdAndYearCountPerMonths/<int:destination_id>/<string:year>',
                              methods=['GET'])
def get_all_reservations_by_destination_id_and_year_count_per_months(destination_id, year):
    if destination_id is None or year is None:
        return jsonify({"error": "Missing destination_id or year parameter"}), 400

    count_per_months = ReservationService.get_all_reservations_by_destination_id_and_year_count_per_months(
        destination_id, year)
    count_per_months_list = [
        {'month': month, 'count': count}
        for month, count in count_per_months
    ]

    return jsonify(count_per_months_list), 200
