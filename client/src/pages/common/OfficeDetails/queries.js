import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getOfficeQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
            location {
                name
                geoPoint {
                    lat
                    lon
                }
            }
            totalRating
            numReviews
            description
            imageUrls
            averageRating
            numReviews
        }
    }
`;