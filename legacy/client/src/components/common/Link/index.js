import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';

const StyledLink = styled(ReactRouterDomLink)`
    text-decoration: none;
`;

const Link = props => {
    const { children, ...customProps } = props;

    if (!customProps.to) {
        customProps.to = '/';
        customProps.onClick = e => e.preventDefault();
    }

    return <StyledLink {...customProps}>{children}</StyledLink>;
};

export default Link;
