import React from 'react';
import styled from 'styled-components';
import { Button as MaterialUIButton } from '@material-ui/core';

const StyledButton = styled(MaterialUIButton)`
    && {
        text-transform: none;
        padding: 16px 16px;
        border-radius: 2px;
    }

    ${props =>
        props.color === 'primary' &&
        `
        && {
            background-color: #0AD5B1;
        }

        &&:hover {
            background-color: #00BC98;
        }
    `};

    ${props =>
        props.color === 'secondary' &&
        `
        && {
            background-color: #f46b13;
        }

        &&:hover {
            background-color: #DB5200;
        }
    `};
`;

const Button = props => {
    const { children, ...customProps } = props;

    return <StyledButton {...customProps}>{children}</StyledButton>;
};

export default Button;
