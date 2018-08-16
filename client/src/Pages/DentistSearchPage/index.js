import React, { Component } from 'react';
import styled from 'styled-components';

import { Container, Flex } from '../../components';

import DentistCard from './DentistCard';
import DentistList from './DentistList';
import Map from '../common/Map';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;

class DentistSearchPage extends Component {
    render() {
        return (
            <Container>
                <StyledContainer>
                    <DentistList />
                    <Map />
                </StyledContainer>
            </Container>
        );
    }
}

export default DentistSearchPage;
