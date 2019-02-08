import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getIdQueryClient = gql`
    {
        activeUser @client {
            id
        }
    }
`;
export const updateInsuranceInfoMutation = gql`
    mutation updateInsuranceInfo($input: UpdateInsuranceInfoInput!) {
        updateInsuranceInfo(input: $input) {
            id
        }
    }
`;