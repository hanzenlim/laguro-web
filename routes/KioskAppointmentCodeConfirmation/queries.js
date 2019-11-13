import { gql } from 'apollo-boost';

/* eslint-disable-next-line */
export const GET_APPOINTMENT = gql`
    query getAppointment($id: String!) {
        getAppointment(id: $id) {
            id
            dentist {
                id
                numReviews
                averageRating
                user {
                    firstName
                    lastName
                    imageUrl
                }
            }
            localStartTime
            localEndTime
        }
    }
`;
