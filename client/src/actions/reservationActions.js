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
