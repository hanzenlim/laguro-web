import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import { space, width, display, propTypes } from 'styled-system';

const StyledLink = styled(ReactLink)`
    text-decoration: none;
    color: ${props => props.theme.colors.text.black};
    ${space};
    ${width};
    ${display};
`;

const StyledExternalLink = styled.a`
    text-decoration: none;
    color: ${props => props.theme.colors.text.black};
    ${space};
    ${width};
    ${display};
`;

const Link = props => {
    const { isExternal, ...rest } = props;

    if (isExternal) {
        const { to, ...externalProps } = rest;

        return <StyledExternalLink href={to} {...externalProps} />;
    }

    return <StyledLink {...rest} />;
};

Link.propTypes = {
    isExternal: PropTypes.bool,
    type: PropTypes.oneOf(['ghost']),
    ...propTypes.space,
    ...propTypes.width,
};

export default Link;
