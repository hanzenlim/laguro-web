import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { width , maxWidth} from 'styled-system'

const StyledSticky = styled.div`
    position: sticky;
    top: ${props => props.offset};
    height: 100%;
    ${width};
    ${maxWidth};
`;

const Sticky = props => (
    <StyledSticky offset={props.offset} {...props}>{props.children}</StyledSticky>
);

Sticky.defaultProps = {
    offset: '0',
    width: 'auto'
};

Sticky.propTypes = {
    offset: PropTypes.string,
};

export default Sticky;
