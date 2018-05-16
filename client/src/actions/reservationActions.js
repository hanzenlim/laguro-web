import axios from 'axios';
import { GET_SELECTED_RESERVATIONS } from './types';
import Reservation from '../models/reservation';

export const createReservation = details => async dispatch => {
    await Reservation.create(details);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: null
    });
};

export const cancelReservation = reservationId => async dispatch => {
    await Reservation.delete(reservationId);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: null
    });
};

export const queryReservations = (key, value) => async dispatch => {
    const reservations = await Reservation.query(key, value);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: reservations
    });
};

// call this function with no patientId to cancel appt
export const reserveAppointment = (
    reservationId,
    appointmentId,
    patientId = undefined
) => dispatch => {
    axios
        .patch(`/api/reservations/${reservationId}/appointments`, {
            appointmentId,
            patientId
        })
        .then(userReservations => {
            dispatch({
                type: GET_SELECTED_RESERVATIONS,
                payload: userReservations.data
            });
        });
};
