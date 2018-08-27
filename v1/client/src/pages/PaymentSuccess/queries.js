import { gql } from 'apollo-boost';
import { appointmentFragment, reservationFragment } from '../../util/fragments';

// eslint-disable-next-line
export const getAppointmentQuery = gql`
    query ($id: String!) {
        getAppointment(id: $id) {
            ${appointmentFragment}
            reservation {
                ${reservationFragment}
            }
        }
    }
`;
