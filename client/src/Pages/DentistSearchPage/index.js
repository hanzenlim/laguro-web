import React, { Component, Fragment } from 'react';

import { Container, Flex } from '../../components';

import DentistCard from './DentistCard';
import DentistList from './DentistList';
import Map from '../common/Map';

import { StyledContainer } from './styles';

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
