import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { space, width, height, display } from 'styled-system';

const StyledLink = styled.a`
    text-decoration: none;
    color: ${props => props.theme.colors.text.black};
    ${space};
    ${width};
    ${height};
    ${display};
`;

const CustomLink = props => {
    const { to, children, isExternal, as, prefetch, ...rest } = props;

    if (isExternal)
        return (
            <StyledLink href={to} {...rest}>
                {children}
            </StyledLink>
        );

    return (
        <Link href={to} as={as} prefetch={prefetch}>
            <StyledLink {...rest}>{children}</StyledLink>
        </Link>
    );
};

CustomLink.defaultProps = {
    isExternal: false,
    prefetch: true,
};

CustomLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isExternal: PropTypes.bool,
};

export default CustomLink;
