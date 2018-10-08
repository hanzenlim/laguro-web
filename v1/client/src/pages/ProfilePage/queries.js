import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getIdQueryClient = gql`
    {
        activeUser @client {
            id
        }
    }
`;

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
                    name
                }
                user {
                    firstName
                    lastName
                    imageUrl
                }
                reviews {
                    rating
                }
            }
        }
    }
`;
