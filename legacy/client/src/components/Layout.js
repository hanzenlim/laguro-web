import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Layout = props => {
    const { children } = props;

    return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
