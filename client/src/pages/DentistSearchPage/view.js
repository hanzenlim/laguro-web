import React from 'react';
import { Container, Box, Grid, Responsive } from '../../components';
import SearchBox from '../common/SearchBox';
import SearchResultsList from '../common/SearchResultsList';
import Map from '../common/Map';

const { Desktop } = Responsive;

const handleMultiLocation = reservations => {
    // Pull just the string addresses from reservations into an array
    const allAddresses = reservations.map(res => res.address);
    // filter out duplicate addresses (if not the first instance of that address within the array, filter it out), prevent many pins from one dentist on the map for a given location if they keep renting the same place over and over
    const uniqueAddresses = reservations.filter(
        (res, index) => allAddresses.indexOf(res.address) === index
    );
    const address =
        uniqueAddresses.length === 1
            ? uniqueAddresses[0].address
            : 'Multiple Locations!';

    return { address, uniqueAddresses };
};

const DentistSearchPageView = props => {
    const { data, total, urlParams, defaultPosition, mapDimensions } = props;

    data.forEach((dentist, index) => {
        const { reservations } = dentist;
        const { address, uniqueAddresses } = handleMultiLocation(reservations);
        const uniqueLocations = uniqueAddresses.map(res => ({
            address: res.address,
            geoPoint: res.geoPoint,
        }));

        data[index] = { ...dentist, address, uniqueLocations };
    });

    const markers = [];

    // create marker for each location a dentist has
    data.forEach(dentist => {
        dentist.uniqueLocations.forEach(location => {
            markers.push({
                ...dentist,
                address: location.address,
                latitude: location.geoPoint.lat,
                longitude: location.geoPoint.lon,
            });
        });
    });

    return (
        <Container pt={[100, '', 160]}>
            <Grid
                gridColumnGap={['', '', '33px']}
                gridTemplateColumns={[
                    '1fr',
                    '',
                    `${total > 0 ? '1fr 1fr' : ''}`,
                ]}
            >
                <Box>
                    <Desktop>
                        {matches =>
                            matches ? null : (
                                <Box mb={20}>
                                    <SearchBox
                                        size="large"
                                        placeholder="Search for dentists by name, location, or specialty"
                                    />
                                </Box>
                            )
                        }
                    </Desktop>
                    <SearchResultsList
                        title="Dentist Results"
                        data={data}
                        total={total}
                    />
                </Box>

                {total > 0 ? (
                    <Desktop>
                        <Box
                            position="fixed"
                            transform="translateX(calc(100% + 34px))"
                            top="160px"
                            height="calc(100vh - 160px)"
                            mb="30px"
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
        </Container>
    );
};

export default DentistSearchPageView;
