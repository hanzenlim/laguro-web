import { get } from 'lodash';

import esClient from '../../../util/esClient';
import { getMyPosition } from '../../../util/navigatorUtil';

const DENTISTS_INDEX = 'dentists';
const MAX_DISTANCE = '100000km';
const MAX_SIZE = 4;

const getFeaturedDentists = async () => {
    const searchLocation = await getMyPosition();
    const searchResponse = await esClient.search({
        index: DENTISTS_INDEX,
        body: {
            query: {
                bool: {
                    must: {
                        match_all: {},
                    },
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

export default getFeaturedDentists;
