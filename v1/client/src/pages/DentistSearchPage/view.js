import React from 'react';
import styled from 'styled-components';

import { Container } from '../../components';

import SearchResultsList from '../common/SearchResultsList';
import Map from '../common/Map';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;

const DentistSearchPageView = props => {
    const { data } = props;

    return (
        <Container>
            <StyledContainer>
                <SearchResultsList data={data} />
                <Map data={data} />
            </StyledContainer>
        </Container>
    );
};

export default DentistSearchPageView;
