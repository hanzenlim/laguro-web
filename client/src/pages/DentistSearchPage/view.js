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
    Loading,
} from '../../components';
import SearchBox from '../common/SearchBox';
import SearchResultsList from '../common/SearchResultsList';
import { ContainerPaddingInPixels } from '../../components/Container';
import SearchFilter from '../common/SearchFilter';

const Map = Loadable({
    loader: () => import('../common/Map' /* webpackChunkName: "map" */),
    loading: () => null,
});

const { Desktop, TabletMobile } = Responsive;

const DentistSearchPageView = props => {
    const {
        data,
        total,
        urlParams,
        defaultPosition,
        showMap,
        toggleMap,
        onShowMore,
        loading,
        onToggleFilter,
        isFilterVisible,
    } = props;

    // data.forEach((dentist, index) => {
    //     const { reservations } = dentist;
    //     const uniqueAddresses = handleMultiLocation(reservations);
    //     const uniqueLocations = uniqueAddresses.map(res => ({
    //         address: res.address,
    //         addressDetails: res.addressDetails,
    //         geoPoint: res.geoPoint,
    //     }));

    //     data[index] = {
    //         ...dentist,
    //         uniqueLocations,
    //         address:
    //             uniqueLocations.length > 1
    //                 ? 'Multiple Locations!'
    //                 : dentist.address,
    //     };
    // });

    const markers = [];

    // create marker for each location a dentist has
    data.forEach(dentist => {
        dentist.appointmentTimeslotsByOffice.forEach(location => {
            markers.push({
                ...dentist,
                address: location.office.location.addressDetails,
                latitude: location.office.location.geoPoint.lat,
                longitude: location.office.location.geoPoint.lon,
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
                                        toggleFilter={onToggleFilter}
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
                            bg="white"
                        >
                            <Container px={[0, 0, 25]}>
                                <TabletMobile>
                                    {isFilterVisible ? <SearchFilter /> : null}
                                </TabletMobile>
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
                                <Desktop>
                                    <Box mt={34}>
                                        <SearchFilter />
                                    </Box>
                                </Desktop>
                            </Container>
                        </Flex>
                    )}
                </Box>
                <Box pt={0}>
                    <Grid
                        gridColumnGap={['', '', '10px']}
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
                                {loading ? (
                                    <Box mt={15}>
                                        <Loading />
                                    </Box>
                                ) : (
                                    <SearchResultsList
                                        data={data}
                                        total={total}
                                        showMap={showMap}
                                        onShowMore={onShowMore}
                                    />
                                )}
                            </Box>
                        </Box>

                        {total > 0 && showMap ? (
                            <Desktop>
                                <Box
                                    position="fixed"
                                    mt={15}
                                    transform="translateX(calc(100% + 425px))"
                                >
                                    <Map
                                        withLinkedMarkers
                                        data={markers}
                                        width={441}
                                        height={500}
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
    showMap: PropTypes.bool,
    defaultPosition: PropTypes.bool,
    mapDimensions: PropTypes.bool,
    total: PropTypes.bool,
    urlParams: PropTypes.bool,
    toggleMap: PropTypes.func,
    onShowMore: PropTypes.func,
};

export default DentistSearchPageView;
