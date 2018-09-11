import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import { space, width, propTypes } from 'styled-system';

const StyledLink = styled(ReactLink)`
    text-decoration: none;
    color: ${props => props.theme.colors.text.black};
    ${space};
    ${width};

    &&:hover {
        text-decoration: ${props =>
            props.type === 'ghost' ? 'none' : 'underline'};
    }
`;

const Link = props => {
    const { ...rest } = props;

    return <StyledLink {...rest} />;
};

Link.propTypes = {
    type: PropTypes.oneOf(['ghost']),
    ...propTypes.space,
    ...propTypes.width,
};

export default Link;
