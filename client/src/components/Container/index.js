import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: ${props => props.theme.maxContainerWidth};
    width: 100%;
    margin: 0 auto;
`;

const Container = props => {
    const { children } = props;

    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
