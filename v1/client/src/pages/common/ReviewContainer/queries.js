import { gql } from 'apollo-boost';

import { reviewerFragment } from '../../../util/fragments';

export const getDentistReviews = gql`
    query($id: String!) {
        getDentist(id: $id) {
            specialty
            user{
                firstName
                lastName
                imageUrl
            }
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;

export const getOfficeReviews = gql`
    query($id: String!) {
        getOffice(id: $id) {
            name
            imageUrls
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;
