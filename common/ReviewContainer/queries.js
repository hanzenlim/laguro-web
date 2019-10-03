import gql from 'graphql-tag';

import { reviewerFragment } from '~/util/fragments';

export const GET_DENTIST_REVIEWS = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            specialty
            user {
                id
                firstName
                lastName
                imageUrl
            }
            numReviews
            totalRating
            averageRating
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;

export const GET_OFFICE_REVIEWS = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            name
            imageUrls
            numReviews
            totalRating
            averageRating
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;
