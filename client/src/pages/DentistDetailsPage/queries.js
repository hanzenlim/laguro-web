import { gql } from 'apollo-boost';
import esClient from '../../util/esClient';
import { DENTISTS } from '../../util/strings';

export const fetchDentistFromES = async queryString => {
    const res = await esClient.get({
        index: DENTISTS,
        id: queryString,
        type: '_doc'
    });

    return res;
};

// eslint-disable-next-line
export const getDentistQuery = gql`
    query($id: String!) {
        getDentist(id: $id) {
            id
            bio
            specialty
            languages
            npiNumber
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
        }
    }
`;
