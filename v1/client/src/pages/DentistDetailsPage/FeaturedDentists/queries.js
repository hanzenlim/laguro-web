import { get } from 'lodash';
import moment from 'moment';

import esClient from '../../../util/esClient';

const DENTISTS_INDEX = 'dentists';
const MAX_SIZE = 5;

// ignore timezone-related characters in timestamp ie 2018-10-10T13:22:39-07:00 => 2018-10-10T13:22:39
const TIME_PRECISION = 19;
const currentTime = moment().format();

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
                        {
                            range: {
                                'reservations.availableTimes.endTime': {
                                    gte: currentTime.substring(
                                        0,
                                        TIME_PRECISION
                                    ),
                                },
                            },
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
