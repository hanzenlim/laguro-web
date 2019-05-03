import { gql } from 'apollo-boost';

export const getAppointmentQuery = gql`
    query($id: String!) {
        getAppointment(id: $id) {
            id
            localStartTime
            timezone
            location {
                name
            }
            dentist {
                id
            }
        }
    }
`;
