import {
    GET_SELECTED_RESERVATIONS,
    CREATE_RESERVATION,
    FETCH_RESERVATION
} from './types';
import Reservation from '../models/reservation';
import history from '../history';

export const getReservation = reservationId => async dispatch => {
    const reservation = await Reservation.get(reservationId);
    dispatch({
        type: FETCH_RESERVATION,
        payload: reservation
    });
};

export const createReservation = params => async dispatch => {
    const response = await Reservation.create(params);
    if (
        response.errors &&
        response.errors[0].message === 'Timeslot already booked!'
    ) {
        alert(
            'Sorry, the reservation window you selected has been booked, please go back and select a new time window.'
        );
    } else {
        const reservation = response.data.createReservation;
        dispatch({
            type: CREATE_RESERVATION,
            payload: reservation
        });
        history.push(`/payment-success?reservationId=${reservation.id}`);
    }
};

export const cancelReservation = reservationId => async () => {
    await Reservation.delete(reservationId);
};

export const queryReservations = (key, value) => async dispatch => {
    const reservations = await Reservation.query(key, value);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: reservations
    });
};
