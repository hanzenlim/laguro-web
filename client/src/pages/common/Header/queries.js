import { gql } from 'apollo-boost';

export const getVisibleModal = gql`
    {
        visibleModal @client
    }
`;
