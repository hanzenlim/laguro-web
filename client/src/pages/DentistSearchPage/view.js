import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import moment from 'moment';
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
import { ContainerPaddingInPixels } from '../../components/Container';

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

    const PADDING_FOR_BOX_SHADOWS_IN_PIXELS = 15;

    return (
        <Box height="100%">
            <Container
                pt={[48, '', total === 0 ? 110 : 160]}
                px={[
                    0,
                    0,
                    ContainerPaddingInPixels -
                        PADDING_FOR_BOX_SHADOWS_IN_PIXELS,
                ]}
            >
                <Box px={[0, '', PADDING_FOR_BOX_SHADOWS_IN_PIXELS]}>
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
                            pb={16}
                            width="100%"
                            left="0"
                            px={[25, '', 0]}
                            position={['relative', '', 'fixed']}
                            zIndex="10"
                            pt={[0, 0, 120]}
                            top={['auto', '', 0]}
                        >
                            <Container px={[0, 0, 25]}>
                                <Flex justifyContent="space-between">
                                    {urlParams.text && !urlParams.location && (
                                        <Text
                                            fontSize={['20px', '22px']}
                                            color="text.black"
                                        >
                                            Search results for{' '}
                                            <Text
                                                display="inline-block"
                                                fontWeight="bold"
                                            >
                                                "{urlParams.text}"
                                            </Text>
                                        </Text>
                                    )}
                                    <Text
                                        fontSize={['20px', '22px']}
                                        color="text.black"
                                    >
                                        {urlParams.location && 'Dentists near '}
                                        <Text
                                            display="inline-block"
                                            fontWeight="bold"
                                        >
                                            {urlParams.location}
                                        </Text>
                                        {urlParams.startTime && ' on '}
                                        {urlParams.startTime && (
                                            <Text
                                                display="inline-block"
                                                fontWeight="bold"
                                            >
                                                {moment(
                                                    urlParams.startTime
                                                ).format('MMM D, YYYY')}
                                            </Text>
                                        )}
                                    </Text>
                                    <Flex display={['none', '', 'flex']}>
                                        <Text
                                            fontSize="16px"
                                            color="text.black"
                                            mr="13px"
                                        >
                                            Map View
                                        </Text>
                                        <Switch onClick={toggleMap} />
                                    </Flex>
                                </Flex>
                            </Container>
                        </Flex>
                    )}
                </Box>
                <Box pt={0}>
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
                                height={['auto', '', 'calc(100vh - 220px)']}
                                p={[0, '', PADDING_FOR_BOX_SHADOWS_IN_PIXELS]}
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
                                    position="fixed"
                                    transform="translateX(calc(100% + 34px))"
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
