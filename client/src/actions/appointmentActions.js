import { CREATE_APPOINTMENT } from './types';
import Appointment from '../models/appointment';
import history from '../history';

// eslint-disable-next-line
export const createAppointment = params => async dispatch => {
    const appointment = await Appointment.create(params);
    dispatch({
        type: CREATE_APPOINTMENT,
        payload: appointment
    });
    history.push(`/payment-success?appointment=${appointment.id}`);
};
