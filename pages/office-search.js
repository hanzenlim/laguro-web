import React, { Fragment } from 'react';
import queryString from 'query-string';
import _get from 'lodash/get';
import Head from 'next/head';

import OfficeSearchPage from '../routes/OfficeSearchPage';
import { DEFAULT_LOCATION } from '../util/navigatorUtil';
import { OFFICES } from '../util/strings';
import esClient from '~/lib/esClient';

const PAGE_SIZE = 14;

// Main Component
const OfficeSearchPageContainer = ({ esData }) => {
    return (
        <Fragment>
            <Head>
                <title>Search Office - Laguro</title>
                <meta
                    name="description"
                    content="Searching for your next dental office is now available at the touch of your fingertip"
                />
                <link
                    rel="canonical"
                    href="https://www.laguro.com/office/search"
                />
            </Head>
            <OfficeSearchPage esData={esData} />
        </Fragment>
    );
};

OfficeSearchPageContainer.getInitialProps = async ({ req }) => {
    const { lat, long: lon, text } = queryString.parse(
        req._parsedOriginalUrl.search
    );

    let distanceFilter = null;
    const defaultPosition = lon && lat ? { lon, lat } : DEFAULT_LOCATION;
    const must = [
        {
            term: { isVerified: { value: true } },
        },
    ];

    if (text) {
        // do not prefix match on document fields if location is specified
        must.push({
            multi_match: {
                query: text,
                type: 'phrase_prefix',
                fields: [
                    // the carrot syntax multiplies the score of the result
                    'name^2',
                    'location.name',
                    'equipment.name',
                ],
            },
        });
    } else {
        distanceFilter = {
            geo_distance: {
                distance: '75km',
                'location.geoPoint': {
                    lon: defaultPosition.lon,
                    lat: defaultPosition.lat,
                },
            },
        };
    }

    const esData = await esClient.search({
        index: OFFICES,
        size: PAGE_SIZE,
        from: 0,
        body: {
            sort: [{ dateCreated: { order: 'asc' } }],
            query: {
                bool: {
                    must,
                    filter: distanceFilter,
                },
            },
        },
    });

    return { esData };
};

export default OfficeSearchPageContainer;
