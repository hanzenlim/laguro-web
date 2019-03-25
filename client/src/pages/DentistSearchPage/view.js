import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import {
    Flex,
    Container,
    Box,
    Grid,
    Responsive,
    Switch,
    Text,
} from '../../components';
import SearchBox from '../common/SearchBox';
import SearchResultsList from '../common/SearchResultsList';
import { formatAddress } from '../../util/styleUtil';
import moment from 'moment';

const Map = Loadable({
    loader: () => import('../common/Map' /* webpackChunkName: "map" */),
    loading: () => null,
});

const { Desktop } = Responsive;

const handleMultiLocation = reservations => {
    // Pull just the string addresses from reservations into an array
    const allAddresses = reservations.map(res => res.address);
    // filter out duplicate addresses (if not the first instance of that address within the array, filter it out), prevent many pins from one dentist on the map for a given location if they keep renting the same place over and over
    const uniqueAddresses = reservations.filter(
        (res, index) => allAddresses.indexOf(res.address) === index
    );

    return uniqueAddresses;
};

const DentistSearchPageView = props => {
    const {
        data,
        total,
        urlParams,
        defaultPosition,
        mapDimensions,
        showMap,
        toggleMap,
        onShowMore,
    } = props;

    data.forEach((dentist, index) => {
        const { reservations } = dentist;
        const uniqueAddresses = handleMultiLocation(reservations);
        const uniqueLocations = uniqueAddresses.map(res => ({
            address: res.address,
            addressDetails: res.addressDetails,
            geoPoint: res.geoPoint,
        }));

        data[index] = {
            ...dentist,
            uniqueLocations,
            address:
                uniqueLocations.length > 1
                    ? 'Multiple Locations!'
                    : dentist.address,
        };
    });

    const markers = [];

    // create marker for each location a dentist has
    data.forEach(dentist => {
        dentist.uniqueLocations.forEach(location => {
            markers.push({
                ...dentist,
                address: formatAddress(
                    location.address,
                    location.addressDetails
                ),
                latitude: location.geoPoint.lat,
                longitude: location.geoPoint.lon,
            });
        });
    });

    return (
        <Box bg="#f8f8f8">
            <Container pt={[48, '', 160]} px={[0, 0, 25]}>
                <Desktop>
                    {matches =>
                        matches ? null : (
                            <Box mb={20} mt={[24, '', 0]} px={[25, '', 0]}>
                                <SearchBox
                                    size="large"
                                    placeholder="Search for dentists by name, location, or specialty"
                                />
                            </Box>
                        )
                    }
                </Desktop>
                {total > 0 && (
                    <Flex
                        justifyContent="space-between"
                        mb="18px"
                        px={[25, '', 0]}
                    >
                        <Text fontSize={['20px', '22px']} color="text.black">
                            {urlParams.location && 'Dentists near '}
                            <Text display="inline-block" fontWeight="bold">
                                {urlParams.location}
                            </Text>
                            {urlParams.startTime && ' on '}
                            {urlParams.startTime && (
                                <Text display="inline-block" fontWeight="bold">
                                    {moment(urlParams.startTime).format(
                                        'MMM D, YYYY'
                                    )}
                                </Text>
                            )}
                        </Text>
                        <Flex display={['none', '', 'flex']}>
                            <Text fontSize="16px" color="text.black" mr="13px">
                                Map View
                            </Text>
                            <Switch onClick={toggleMap} />
                        </Flex>
                    </Flex>
                )}
                <Box mb={211}>
                    <Grid
                        gridColumnGap={['', '', '33px']}
                        gridTemplateColumns={[
                            '1fr',
                            '',
                            `${total > 0 && showMap ? '1fr 1fr' : ''}`,
                        ]}
                    >
                        <Box>
                            <Box
                                style={{ overflow: 'scroll' }}
                                height={['auto', '', 'calc(100vh - 220px)']}
                            >
                                <SearchResultsList
                                    data={data}
                                    total={total}
                                    showMap={showMap}
                                    onShowMore={onShowMore}
                                />
                            </Box>
                        </Box>

                        {total > 0 && showMap ? (
                            <Desktop>
                                <Box
                                    position="absolute"
                                    transform="translateX(calc(100% + 34px))"
                                    top="220px"
                                    height="calc(100vh - 220px)"
                                    bottom="0"
                                >
                                    <Map
                                        data={markers}
                                        width={mapDimensions.width}
                                        height={mapDimensions.height}
                                        urlParams={urlParams}
                                        defaultPosition={defaultPosition}
                                    />
                                </Box>
                            </Desktop>
                        ) : null}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

DentistSearchPageView.propTypes = {
    data: PropTypes.func,
    showMap: PropTypes.boolean,
    defaultPosition: PropTypes.boolean,
    mapDimensions: PropTypes.boolean,
    total: PropTypes.boolean,
    urlParams: PropTypes.boolean,
    toggleMap: PropTypes.func,
    onShowMore: PropTypes.func,
};

export default DentistSearchPageView;
