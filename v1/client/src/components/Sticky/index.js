import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSticky = styled.div`
    position: sticky;
    top: ${props => props.offset};
    height: 100%;
    width: 100%;
`;

const Sticky = props => (
    <StyledSticky offset={props.offset}>{props.children}</StyledSticky>
);

Sticky.defaultProps = {
    offset: '0',
};

Sticky.propTypes = {
    offset: PropTypes.string,
};

export default Sticky;
