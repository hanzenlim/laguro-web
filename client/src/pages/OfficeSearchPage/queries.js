import { gql } from 'apollo-boost';
import {
    officeFragment,
    listingFragment,
    reviewerFragment,
    filterActive,
} from '../../util/fragments';

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
