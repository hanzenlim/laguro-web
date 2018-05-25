import makeApiCall from '../util/clientDataLoader';
import { appointmentFragment, reservationFragment } from '../util/fragments';

const createAppointmentQuery = `
    mutation CreateAppointment($input: CreateAppointmentInput!) {
        createAppointment(input: $input) {
            ${appointmentFragment}
        }
    }
`;

const getAppointmentQuery = `
    query ($id: String!) {
        getAppointment(id: $id) {
            ${appointmentFragment}
            reservation {
                ${reservationFragment}
            }
        }
    }
`;

const Appointment = {
    get: async appointmentId => {
        if (!appointmentId) {
            return null;
        }
        const response = await makeApiCall(getAppointmentQuery, {
            id: appointmentId
        });
        return response.data.getAppointment;
    },
    create: async params => {
        const response = await makeApiCall(createAppointmentQuery, {
            input: params
        });
        return response.data.createAppointment;
    }
};

export default Appointment;
