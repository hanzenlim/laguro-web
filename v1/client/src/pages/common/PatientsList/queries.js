import { gql } from 'apollo-boost';

export const getDentistIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const getPatientsQuery = gql`
    query getDentist($id: String!) {
        getDentist(id: $id) {
            id
            patients {
                id
                firstName
                lastName
                imageUrl
                appointments {
                    id
                    endTime
                }
                patientImages {
                    imageUrl
                }
            }
        }
    }
`;
