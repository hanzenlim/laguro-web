import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            bio
            specialty
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
            totalRating
            numReviews
            averageRating
        }
    }
`;
