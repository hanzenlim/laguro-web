import {
    GET_SELECTED_RESERVATIONS,
    CREATE_RESERVATION,
    FETCH_RESERVATION,
} from './types';
import Reservation from '../models/reservation';
import history from '../history';

export const getReservation = reservationId => async dispatch => {
    const reservation = await Reservation.get(reservationId);
    dispatch({
        type: FETCH_RESERVATION,
        payload: reservation,
    });
};

export const updateReservation = params => async dispatch => {
    const reservation = await Reservation.update(params);
    dispatch({
        type: CREATE_RESERVATION,
        payload: reservation,
    });
    history.push(`/payment-success?reservationId=${reservation.id}`);
};

export const createReservation = params => async dispatch => {
    const response = await Reservation.create(params);
    if (response && response.errors) {
        if (response.errors[0].message === 'Timeslot already booked!') {
            alert(
                'Sorry, the reservation window you selected has been booked, please go back and select a new time window.'
            );
        } else if (
            response.errors[0].message === 'Timeslot is outside listing window!'
        ) {
            alert(
                'Sorry, the reservation window you selected is outside of the available window for this listing. Please go back and select a new time window'
            );
        } else {
            alert('Sorry, something went wrong. Please try again later.');
        }
    } else {
        const reservation = response.data.createReservation;
        dispatch({
            type: CREATE_RESERVATION,
            payload: reservation,
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
        payload: reservations,
    });
};
