import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const maxWidth = props =>
    props.maxWidth
        ? { maxWidth: `${props.maxWidth}px` }
        : { maxWidth: props.theme.maxContainerWidth };

const StyledContainer = styled.div`
    margin: 0 auto;
    padding: 0 10px;
    ${maxWidth};
`;

const Container = props => <StyledContainer {...props} />;

Container.propTypes = {
    maxWidth: PropTypes.number
};

export default Container;
