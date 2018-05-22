import makeApiCall from '../util/clientDataLoader';
import { appointmentFragment } from '../util/fragments';

const createAppointmentQuery = `
    mutation CreateAppointment($input: CreateAppointmentInput!) {
        createAppointment(input: $input) {
            ${appointmentFragment}
        }
    }
`;

const Appointment = {
    create: async params => {
        const response = await makeApiCall(createAppointmentQuery, {
            input: params
        });
        return response.data.createAppointment;
    }
};

export default Appointment;
