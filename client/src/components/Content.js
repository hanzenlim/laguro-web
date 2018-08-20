import React from 'react';
import styled from 'styled-components';
import theme from '../components/theme';

const StyledContent = styled.div`
    flex: 1 0 auto;
    max-width: ${theme.maxContainerWidth};
`;

const Content = props => {
    const { children } = props;

    return <StyledContent>{children}</StyledContent>;
};

export default Content;
