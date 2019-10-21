import { gql } from 'apollo-boost';

export const CREATE_DENTIST = gql`
    mutation createDentistWithAuth($input: CreateDentistInput!) {
        createDentistWithAuth(input: $input) {
            id
            languages
            acceptedInsurances
            bio
            procedures {
                code
                duration
                group
                name
            }
            user {
                isDentist
                isHost
            }
            token
        }
    }
`;

export const UPDATE_DENTIST = gql`
    mutation updateDentist($input: UpdateDentistInput!) {
        updateDentist(input: $input) {
            id
            bio
            specialty
        }
    }
`;

export const UPDATE_USER_IMAGE_URL = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            imageUrl
        }
    }
`;

export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            firstAppointmentDuration
            specialty
            languages
            permalink
            procedures {
                group
            }
            bio
            acceptedInsurances
        }
    }
`;
