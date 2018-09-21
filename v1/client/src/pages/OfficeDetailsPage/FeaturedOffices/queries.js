import { get } from 'lodash';

import esClient from '../../../util/esClient';
import { getMyPosition } from '../../../util/navigatorUtil';

const OFFICES_INDEX = 'offices';
const MAX_DISTANCE = '100000km';
const MAX_SIZE = 6;

const getFeaturedOffices = async () => {
    const searchLocation = await getMyPosition();
    const searchResponse = await esClient.search({
        index: OFFICES_INDEX,
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

export default getFeaturedOffices;
