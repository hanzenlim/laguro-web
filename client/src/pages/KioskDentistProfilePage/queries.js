import { gql } from 'apollo-boost';

export const CREATE_DENTIST = gql`
    mutation createDentist($input: CreateDentistInput!) {
        createDentist(input: $input) {
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
        }
    }
`;

export const UPDATE_DENTIST = gql`
    mutation updateDentist($input: UpdateDentistInput!) {
        updateDentist(input: $input) {
            id
            specialty
        }
    }
`;

export const UPDATE_USER_IMAGE_URL = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
        }
    }
`;

export const getActiveUserQuery = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
            imageUrl
            email
            intercomHash
            dentistId
            isDentist
            isHost
            token
        }
    }
`;
