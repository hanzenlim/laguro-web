import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
        }
    }
`;

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            imageUrl
            firstName
            middleName
            lastName
            phoneNumber
            notificationSettings {
                general {
                    email
                    sms
                }
            }
        }
    }
`;

export const updateUserMutation = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            imageUrl
            firstName
            middleName
            lastName
            phoneNumber
            notificationSettings {
                general {
                    email
                    sms
                }
            }
        }
    }
`;
