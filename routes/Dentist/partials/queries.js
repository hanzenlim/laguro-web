import get from 'lodash/get';
import esClient from '~/lib/esClient';

const DENTISTS_INDEX = 'dentists';
const MAX_SIZE = 20;

const getFeaturedDentists = async () => {
    const searchResponse = await esClient.search({
        index: DENTISTS_INDEX,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: { isVerified: { value: true } },
                        },
                    ],
                },
            },
        },
        from: 0,
        size: MAX_SIZE,
    });

    return get(searchResponse, 'hits.hits');
};

export default getFeaturedDentists;
