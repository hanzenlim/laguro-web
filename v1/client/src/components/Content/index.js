import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
    flex: 1;
    margin-bottom: 80px;
    width: 100%;
`;

const Content = props => {
    const { children } = props;

    return <StyledContent>{children}</StyledContent>;
};

export default Content;
