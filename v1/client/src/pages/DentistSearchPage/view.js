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

const DentistSearchPageView = props => {
    const { data, total } = props;

    return (
        <Container>
            <StyledContainer mt={40}>
                <SearchResultsList data={data} total={total} />
                <Map data={data} />
            </StyledContainer>
        </Container>
    );
};

export default DentistSearchPageView;
