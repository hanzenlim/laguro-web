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
    const response = await Appointment.create(params);
    if (response.errors) {
        if (response.errors[0].message === 'Timeslot already booked!') {
            alert(
                'Sorry, the appointment window you selected has been booked, please go back and select a new appointment.'
            );
        } else if (response.errors[0].message === 'Timeslot is in the past!') {
            alert(
                'Sorry, the appointment window you selected is in the past. Please go back and select a new appointment.'
            );
        }
    } else {
        const appointment = response.data.createAppointment;
        dispatch({
            type: CREATE_APPOINTMENT,
            payload: appointment
        });
        history.push(`/payment-success?appointmentId=${appointment.id}`);
    }
};
