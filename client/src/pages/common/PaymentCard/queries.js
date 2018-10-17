import { gql } from 'apollo-boost';
// eslint-disable-next-line
export const GET_VISIBLE_MODAL = gql`
    {
        visibleModal @client
    }
`;
