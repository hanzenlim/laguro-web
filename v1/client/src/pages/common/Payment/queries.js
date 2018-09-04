import { gql } from 'apollo-boost';
import { reservationFragment, officeFragment } from '../../../util/fragments';

// eslint-disable-next-line
export const getReservationQuery = gql`
    query ($id: String!) {
        getReservation(id: $id) {
            ${reservationFragment}
            office {
                ${officeFragment}
            }
        }
    }
`;
