import { gql } from 'apollo-boost';
import {
    reviewerFragment,
    dentistFragment,
    userFragment,
    reservationFragment,
} from '../../util/fragments';

export const getActiveDentistsQuery = gql`
    query {
        getActiveDentists {
            dentist {
                ${dentistFragment}
                user {
                    ${userFragment}
                }
                reviews {
                    ${reviewerFragment}
                }
            }
            reservations {
                ${reservationFragment}
            }
        }
    }
`;

export const scanDentistsQuery = gql`
    query {
        scanDentists {
            id
            location
            specialty
            user {
                id
                firstName
                lastName
            }
        }
    }
`;