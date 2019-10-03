import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getOfficeImageQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            imageUrls
            name
            description
            location {
                name
            }
        }
    }
`;
