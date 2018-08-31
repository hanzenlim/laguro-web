import { gql } from 'apollo-boost';

import { reviewerFragment } from '../../../util/fragments';

export const getDentistReviews = gql`
    query($id: String!) {
        getDentist(id: $id) {
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;

export const getOfficeReviews = gql`
    query($id: String!) {
        getOffice(id: $id) {
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;
