import { CREATE_APPOINTMENT, GET_SELECTED_APPOINTMENTS } from './types';
import Appointment from '../models/appointment';
import history from '../history';

export const getAppointment = appointmentId => async dispatch => {
    const appointment = await Appointment.get(appointmentId);
    dispatch({
        type: GET_SELECTED_APPOINTMENTS,
        payload: appointment
    });
};

export const createAppointment = params => async dispatch => {
    const appointment = await Appointment.create(params);
    dispatch({
        type: CREATE_APPOINTMENT,
        payload: appointment
    });
    history.push(`/payment-success?appointmentId=${appointment.id}`);
};
