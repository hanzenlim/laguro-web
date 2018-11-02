import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components';

const StyledContent = styled(Box)`
    flex: 1;
    width: 100%;
    background: white;
`;

const Content = props => {
    const { children } = props;

    return <StyledContent is="main">{children}</StyledContent>;
};

export default Content;
