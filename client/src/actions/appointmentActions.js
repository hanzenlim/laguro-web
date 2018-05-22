import Appointment from '../models/appointment';

// eslint-disable-next-line
export function createAppointment(params) {
    return async () => {
        await Appointment.create(params);
    };
}
