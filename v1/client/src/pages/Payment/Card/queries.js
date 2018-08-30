import { gql } from 'apollo-boost';
import { paymentOptionFragment } from '../../../util/fragments';

// eslint-disable-next-line
export const addPaymentOptionMutation = gql`
    mutation AddPaymentOption($input: AddPaymentOptionInput!) {
        addPaymentOption(input: $input) {
            ${paymentOptionFragment}
        }
    }
`;

export const getPaymentOptionQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            paymentOptions {
                id
                address_city
                address_country
                last4
                brand
                exp_month
                exp_year
                default
            }
        }
    }
`;
