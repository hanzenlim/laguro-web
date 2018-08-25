import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getActiveOfficesQuery = gql`
    query {
        getActiveOffices {
            id
            name
            location
            reviews {
                rating
            }
            imageUrls
        }
    }
`;
