import { get } from 'lodash';

import esClient from '../../../util/esClient';

const myPosition = () => {
    let fPosition = { lon: 122.1561, lat: 37.7249 }; // SanLeandro is the default location
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(position => {
            fPosition = {
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            };
        });

    return fPosition;
};

const DENTISTS_INDEX = 'dentists';

const getFeaturedDentists = async () => {
    const SEARCH_LOCATION = await myPosition();
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
                            distance: '100000km',
                            'location.geoPoint': SEARCH_LOCATION,
                        },
                    },
                },
            },
        },
        from: 0,
        size: 30,
    });

    return get(searchResponse, 'hits.hits');
};

export default getFeaturedDentists;
