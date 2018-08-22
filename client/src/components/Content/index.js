import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
    flex: 1 0 auto;
`;

const Content = props => {
    const { children } = props;

    return <StyledContent>{children}</StyledContent>;
};

export default Content;
