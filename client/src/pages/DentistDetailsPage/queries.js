import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            bio
            specialty
            languages
            acceptedInsurances
            procedures {
                group
            }
            user {
                id
                firstName
                lastName
                imageUrl
            }
            reviews {
                id
                rating
            }
            isVerified
            totalRating
            numReviews
            averageRating
            reservations {
                id
                office {
                    id
                }
                location {
                    name
                    addressDetails
                    geoPoint {
                        lat
                        lon
                    }
                }
            }
        }
    }
`;
