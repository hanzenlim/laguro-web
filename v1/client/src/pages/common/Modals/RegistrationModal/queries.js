import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const CREATE_LOCAL_USER = gql`
    mutation CreateLocalUser($input: CreateLocalUserInput!) {
        createLocalUser(input: $input) {
            id
            firstName
            middleName
            lastName
            imageUrl
        }
    }
`;
