import React from 'react';
import { Container } from '../../../components';
import { StyledWrapper } from './styles';

const FeaturedList = () => {
    return (
        // For flexibility in layout, let's put max width containers here
        // instead inside of HomePage/index.js
        <Container>
            <StyledWrapper>Featured List</StyledWrapper>
        </Container>
    );
};

export default FeaturedList;
