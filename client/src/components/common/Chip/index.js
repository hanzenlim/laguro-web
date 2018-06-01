import React from 'react';
import { Chip as MaterialUIChip } from '@material-ui/core';
import styled from 'styled-components';

const StyledChip = styled(MaterialUIChip)`
    && {
        margin-right: 10px;
        border-radius: 3px;
        height: 25px;
    }

    ${props =>
        props.label === 'Available' &&
        `
        && {
            background-color: #0AD5B1;
        }
    `};

    ${props =>
        props.label === 'Reserved' &&
        `
        && {
            background-color: #f46b13;
        }
    `};
`;

const Chip = props => {
    const { children, ...customProps } = props;

    return <StyledChip {...customProps}>{children}</StyledChip>;
};

export default Chip;
