import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            imageUrl
            firstName
            middleName
            lastName
            phoneNumber
            languages
            gender
            dob
            email
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
            id
            imageUrl
            firstName
            middleName
            lastName
            phoneNumber
            dentistId
            isDentist
            isHost
            googleId
            password
            email
            notificationSettings {
                general {
                    email
                    sms
                }
            }
        }
    }
`;
