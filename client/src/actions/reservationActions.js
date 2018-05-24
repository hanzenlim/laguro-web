import { GET_SELECTED_RESERVATIONS, CREATE_RESERVATION } from './types';
import Reservation from '../models/reservation';
import history from '../history';

export const createReservation = params => async dispatch => {
    const reservation = await Reservation.create(params);
    dispatch({
        type: CREATE_RESERVATION,
        payload: reservation,
    });
    history.push(`/payment-success?reservationId=${reservation.id}`);
};

export const cancelReservation = reservationId => async dispatch => {
    await Reservation.delete(reservationId);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: null,
    });
};

export const queryReservations = (key, value) => async dispatch => {
    const reservations = await Reservation.query(key, value);
    dispatch({
        type: GET_SELECTED_RESERVATIONS,
        payload: reservations,
    });
};
