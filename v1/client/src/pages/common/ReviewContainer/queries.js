import { gql } from 'apollo-boost';

import { reviewerFragment } from '../../../util/fragments';

export const GET_DENTIST_REVIEWS = gql`
    query($id: String!) {
        getDentist(id: $id) {
            specialty
            user {
                firstName
                lastName
                imageUrl
            }
            numReviews
            totalRating
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;

export const GET_OFFICE_REVIEWS = gql`
    query($id: String!) {
        getOffice(id: $id) {
            name
            imageUrls
            numReviews
            totalRating
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;
