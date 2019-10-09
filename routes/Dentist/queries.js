import gql from 'graphql-tag';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import esClient from '~/lib/esClient';
import { DENTISTS } from '~/util/strings';

export const fetchDentistFromES = async queryString => {
    const res = await esClient.get({
        index: DENTISTS,
        id: queryString,
        type: '_doc',
    });

    return res;
};

export const fetchDentistFromESByPermalink = async permalink => {
    const res = await esClient.search({
        index: DENTISTS,
        type: '_doc',
        body: {
            query: {
                match_phrase: {
                    permalink,
                },
            },
        },
    });

    const dentistsArray = _get(res, 'hits.hits', []);

    if (!_isEmpty(dentistsArray)) {
        return dentistsArray[0];
    }

    return null;
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
