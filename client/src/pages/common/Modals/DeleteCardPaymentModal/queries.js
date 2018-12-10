import { gql } from 'apollo-boost';

export const getUserIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
        }
    }
`;

export const removePaymentOptionMutation = gql`
    mutation($input: RemovePaymentOptionInput!) {
        removePaymentOption(input: $input)
    }
`;
