import { get } from 'lodash';

import esClient from '~/lib/esClient';
import { getMyPosition } from '~/util/navigatorUtil';

const OFFICES_INDEX = 'offices';
const MAX_DISTANCE = '100000km';
const MAX_SIZE = 8;

const getFeaturedOffices = async () => {
    const searchLocation = await getMyPosition();
    const searchResponse = await esClient.search({
        index: OFFICES_INDEX,
        body: {
            sort: [{ dateCreated: { order: 'asc' } }],
            query: {
                bool: {
                    must: [
                        {
                            term: { isVerified: { value: true } },
                        },
                        {
                            match_all: {},
                        },
                    ],

                    filter: {
                        geo_distance: {
                            distance: MAX_DISTANCE,
                            'location.geoPoint': searchLocation,
                        },
                    },
                },
            },
        },
        from: 0,
        size: MAX_SIZE,
    });

    return get(searchResponse, 'hits.hits');
};

export default getFeaturedOffices;
