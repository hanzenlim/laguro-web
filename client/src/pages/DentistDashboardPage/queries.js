import { gql } from 'apollo-boost';

export const getUserQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            middleName
            isVerified
            dentistId
            isHost
            isDentist
            dentist {
                id
                deaRegistrationNumber
                offices {
                    id
                }
                bio
                specialty
                procedures {
                    group
                }
                user {
                    id
                    firstName
                    lastName
                    imageUrl
                }
                reviews {
                    id
                    rating
                }
            }
        }
    }
`;
