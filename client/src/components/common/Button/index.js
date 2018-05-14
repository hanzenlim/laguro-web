import React from 'react';
import styled from 'styled-components';
import { Button as MaterialUIButton } from '@material-ui/core';

const StyledButton = styled(MaterialUIButton)`
    && {
        text-transform: none;
        padding: 14px 16px;
        border-radius: 2px;
    }

    ${props =>
        props.color === 'primary' &&
        `
        && {
            background-color: #f46b13;
        }
    `};
`;

const Button = props => {
    const { children, ...customProps } = props;

    return <StyledButton {...customProps}>{children}</StyledButton>;
};

export default Button;
