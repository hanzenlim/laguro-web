import { get } from 'lodash';

import { DENTISTS, OFFICES } from '~/util/strings';
import esClient from '~/lib/esClient';
import MajorCities from '~/data/majorCities';

const MAX_DISTANCE = 75;

const generateBuckets = (allCities, index) => {
    const citiesObj = {};
    allCities.forEach(city => {
        citiesObj[city.name] = {
            geo_distance: {
                field:
                    index === DENTISTS
                        ? 'reservations.geoPoint'
                        : 'location.geoPoint',
                distance_type: 'plane',
                origin: city.origin,
                unit: 'km',
                ranges: [{ to: MAX_DISTANCE }],
            },
        };
    });

    return citiesObj;
};

const getOtherLocationResults = async (state = null, index) => {
    let nearbyLocations = generateBuckets(MajorCities, index);
    if (state)
        nearbyLocations = generateBuckets(
            MajorCities.filter(city => city.state === state),
            index
        );
    let searchFilter = { match_all: {} };
    if (index === DENTISTS)
        searchFilter = {
            bool: {
                must: [
                    { exists: { field: 'reservations' } },
                    {
                        term: {
                            isVerified: {
                                value: true,
                            },
                        },
                    },
                ],
            },
        };

    if (index === OFFICES)
        searchFilter = {
            bool: {
                must: [{ term: { isVerified: { value: true } } }],
            },
        };

    const searchResponse = await esClient.search({
        index,
        body: {
            query: searchFilter,
            size: 0,
            aggs: nearbyLocations,
        },
    });

    const aggregations = get(searchResponse, 'aggregations');

    const parsedLocations = [];
    if (aggregations && Object.keys(aggregations).length > 0) {
        Object.keys(aggregations).forEach(location => {
            const docCount = aggregations[location].buckets[0].doc_count;

            if (docCount > 0) {
                parsedLocations.push({
                    city: location,
                    docCount,
                });
            }
        });
    }

    return parsedLocations;
};

export default getOtherLocationResults;
