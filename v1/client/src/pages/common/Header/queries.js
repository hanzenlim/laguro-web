import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getUserQuery = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
            imageUrl
<<<<<<< HEAD
            email
            intercomHash
=======
            dentistId
>>>>>>> Add dentistId to the header query
        }
        visibleModal @client
    }
`;
