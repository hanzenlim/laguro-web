import gql from 'graphql-tag';

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
            office {
                id
            }
        }
    }
`;
