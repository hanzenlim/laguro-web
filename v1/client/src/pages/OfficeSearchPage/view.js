import React from 'react';
import styled from 'styled-components';

import { Container, Box } from '../../components';

import SearchResultsList from '../common/SearchResultsList';
import Map from '../common/Map';
import { numMaxContainerWidth } from '../../components/theme';

const contentWidth =
    Math.min(window.innerWidth * 0.8, numMaxContainerWidth) * 0.45;

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;

const OfficeSearchPageView = props => {
    const { data, total, urlParams, defaultPosition } = props;

    return (
        <Container>
            <StyledContainer mt={40}>
                <SearchResultsList
                    title="Office Results"
                    data={data}
                    total={total}
                />
                <Map
                    data={data}
                    width={contentWidth}
                    urlParams={urlParams}
                    defaultPosition={defaultPosition}
                />
            </StyledContainer>
        </Container>
    );
};

export default OfficeSearchPageView;
