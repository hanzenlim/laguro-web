import { gql } from 'apollo-boost';

export const REGISTER_DWOLLA_CUSTOMER = gql`
    mutation($input: RegisterPersonalDwollaCustomerInput!) {
        registerPersonalDwollaCustomer(input: $input)
    }
`;

export default REGISTER_DWOLLA_CUSTOMER;
