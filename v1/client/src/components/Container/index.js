import React from 'react';
import styled from 'styled-components';
import Box from '../Box';

const StyledContainer = styled(Box)`
    max-width: ${props => props.maxWidth || props.theme.maxContainerWidth};
    width: 100%;
    margin: 0 auto;
`;

const Container = props => {
    const { children, ...rest } = props;

    return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default Container;
