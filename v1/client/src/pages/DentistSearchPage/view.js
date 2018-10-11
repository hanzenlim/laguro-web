import React from 'react';
import styled from 'styled-components';

import { Container, Box } from '../../components';

import SearchResultsList from '../common/SearchResultsList';
import Map from '../common/Map';

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;

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
    const { data, total, urlParams, defaultPosition } = props;

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
        <Container>
            <StyledContainer mt={40}>
                <SearchResultsList
                    title="Dentist Results"
                    data={data}
                    total={total}
                />
                <Map
                    width={Math.min(window.innerWidth * 0.8, 1280) * 0.45}
                    data={markers}
                    urlParams={urlParams}
                    defaultPosition={defaultPosition}
                />
            </StyledContainer>
        </Container>
    );
};

export default DentistSearchPageView;
