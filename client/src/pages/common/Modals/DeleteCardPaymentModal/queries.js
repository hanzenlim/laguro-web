import { gql } from 'apollo-boost';

export const removePaymentOptionMutation = gql`
    mutation($input: RemovePaymentOptionInput!) {
        removePaymentOption(input: $input)
    }
`;
