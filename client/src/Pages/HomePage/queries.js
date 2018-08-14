import { gql } from 'apollo-boost';
import {
    officeFragment,
    listingFragment,
    reviewerFragment,
    filterActive
} from '../../util/fragments';

const hello = 'hello';
export default hello;

export const getActiveOfficesQuery = gql`
    query {
        getActiveOffices {
            ${officeFragment}
            listings(${filterActive}) {
                ${listingFragment}
            }
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;