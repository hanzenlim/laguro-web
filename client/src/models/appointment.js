import makeApiCall from '../util/clientDataLoader';
import { appointmentFragment, reservationFragment } from '../util/fragments';
import { CANCELLED_BY_PATIENT } from '../util/strings';

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

const queryAppointmentQuery = `
    query ($input: QueryParams!) {
        queryAppointments(input: $input) {
            ${appointmentFragment}
        }
    }
`;

const cancelAppointmentQuery = `
    mutation ($input: CancelAppointmentInput!) {
        cancelAppointment(input: $input) {
            id
        }
    }
`;

const Appointment = {
    query: async (partitionKey, partitionValue, options) => {
        const response = await makeApiCall(queryAppointmentQuery, {
            input: {
                partitionKey,
                partitionValue,
                options
            }
        });
        return response.data.queryAppointments;
    },
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
        if (response.errors) {
            if (response.errors[0].message === 'Timeslot already booked!') {
                alert(
                    'Sorry, the appointment window you selected has been booked, please go back and select a new appointment.'
                );
            }
        } else {
            return response.data.createAppointment;
        }
    },
    delete: async appointmentId => {
        const response = await makeApiCall(cancelAppointmentQuery, {
            input: {
                id: appointmentId,
                cancellationType: CANCELLED_BY_PATIENT
            }
        });
        return response.data.cancelAppointment;
    }
};

export default Appointment;
