import { get } from 'lodash';

import esClient from '../../../util/esClient';

const DENTISTS_INDEX = 'dentists';
const MAX_SIZE = 5;

const getFeaturedDentists = async dentist => {
    const searchResponse = await esClient.search({
        index: DENTISTS_INDEX,
        body: {
            query: {
                match_phrase_prefix: {
                    specialty: dentist.specialty,
                },
            },
        },
        from: 0,
        size: MAX_SIZE,
    });

    return get(searchResponse, 'hits.hits');
};

export default getFeaturedDentists;
