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
                appointments(
                    options: {
                        filters: [
                            { filterKey: "dentistId", filterValues: [$id] }
                        ]
                    }
                ) {
                    id
                    localStartTime
                }
                patientImages {
                    imageUrl
                    signedImageUrl
                }
            }
        }
    }
`;

export const getFileStackPolicySignatureQuery = gql`
    query($type: String!, $handle: String) {
        getFileStackPolicySignature(type: $type, handle: $handle) {
            signature
            policy
        }
    }
`;
