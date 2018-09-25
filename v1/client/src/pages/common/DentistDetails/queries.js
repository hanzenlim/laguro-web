import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            bio
            specialty
            appointments {
                location {
                    name
                    geoPoint {
                        lat
                        lon
                    }
                }
            }
            procedures {
                group
            }
            user {
                firstName
                lastName
                imageUrl
            }
            reviews {
                rating
            }
            totalRating
            numReviews
            averageRating
        }
    }
`;
